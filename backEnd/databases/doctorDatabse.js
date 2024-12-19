import pool from "../server.js";
import { catchAsyncError } from "../utilities.js";

const retrieveAllDoctors = async (fields, filters, orders, limit, page) => {
  try {
    let query = "select ";
    if (fields) query += fields;
    else
      query += ` userId, 
          firstName, 
          lastName, 
          phoneNumber,
          email, 
          gender, 
          wallet, 
          createdAt, 
          updatedAt, 
          birthDate , 
          userState, 
          licenseNumber ,  
          specialization , 
          yearsOfExperience , 
          about ,
          fees,
          clinicLocation , 
          count(r.doctorId) as visitors , 
          CASE 
            WHEN AVG(r.rate) IS NOT NULL THEN round (AVG(r.rate), 2) 
            ELSE 0 
          END AS overallRating ,
          CASE 
            WHEN AVG(r.waitingTime) IS NOT NULL THEN round (AVG(r.waitingTime), 2) 
            ELSE 0 
          END AS averageWaitingTime
          `;
    query += `  
          from Users u  
          join Doctors d on u .userId = d.doctorId     
          left join Reviews r on r.doctorId= d.doctorId  
                `;

    if (filters) query += `where ${filters.join(" and ")}       `;
    query += `  group by 
          userId, 
          firstName, 
          lastName, 
          phoneNumber,
          email, 
          gender, 
          wallet, 
          createdAt, 
          updatedAt, 
          birthDate ,  
          licenseNumber ,  
          specialization , 
          yearsOfExperience , 
          about ,
          fees,
          clinicLocation 
              `;
    if (orders) query += `order by ${orders.join(" , ")}       `;
    query += ` LIMIT ${limit} OFFSET ${page - 1} * ${limit} ; `;
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const retrieveDoctor = async (id) => {
  try {
    const query = `
    SELECT 
      u.userId, 
      u.firstName, 
      u.lastName, 
      u.phoneNumber,
      u.email, 
      u.gender, 
      u.wallet, 
      u.createdAt, 
      u.updatedAt, 
      u.birthDate,  
      d.licenseNumber,  
      d.specialization, 
      d.yearsOfExperience, 
      d.about,
      d.fees,
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'locationId',da.locationId,
           'startTime',da.startTime,
           'endTime',da.endTime ,
           'workingDay',workingDay,
           'workSpaceId',da.workspaceId , 
           'location', (select workspacesLocation  from WorkspaceLocations wl where wl.locationId =da.locationId limit 1 )
        )
      ) as availibility , 
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'rate', r.rate,
          'review', r.review,
          'reviewDate', r.reviewDate,
          'waitingTime', r.waitingTime,
          'patient', (
            SELECT 
              JSON_BUILD_OBJECT(
                'userId', u2.userId,
                'firstName', u2.firstName,
                'lastName', u2.lastName
              )
            FROM 
              Users u2
            JOIN 
              Patients p ON u2.userId = p.patientId
            WHERE 
              p.patientId = r.patientId
            LIMIT 1
          )
        )
      ) AS reviews
    FROM 
        Users u  
    JOIN 
        Doctors d ON u.userId = d.doctorId     
    LEFT JOIN 
        Reviews r ON r.doctorId = d.doctorId  
    LEFT JOIN 
        DoctorAvailability da ON da.doctorId = d.doctorId
    WHERE 
        d.doctorId = $1
    GROUP BY 
        u.userId, 
        u.firstName, 
        u.lastName, 
        u.phoneNumber,
        u.email, 
        u.gender, 
        u.wallet, 
        u.createdAt, 
        u.updatedAt, 
        u.birthDate,  
        d.licenseNumber,  
        d.specialization, 
        d.yearsOfExperience, 
        d.about,
        d.fees
  `;

    const res = await pool.query(query, [id]);

    return res.rows;
  } catch (err) {
    console.log(err);
  }
};

const reteieveDoctorPatients = async (id) => {
  try {
    const query = `
    SELECT 
      a.doctorId ,
      a.patientId , 
      u.firstName ||' ' || u.lastName as patientName,
      u.email,
      u.gender,
      u.birthDate
    from 
      Appointments a  
      join Users u ON u.userId= a.patientId
    
      where a.doctorId=$1
    group by 
      a.doctorId , 
      a.patientId ,
      u.firstName,
      u.lastName,
      u.email,
      u.gender,
      u.birthDate      

    `;
    const res = await pool.query(query, [id]);
    return res.rows;
  } catch (error) {
    console.log(error);
  }
};

const createAvailability = async (attributes, doctorId, workspaceId) => {
  try {
    const query = `insert into DoctorAvailability(workingDay, startTime, endTime,locationId,workspaceId,doctorId )
                  values($1,$2,$3,$4,$5,$6) returning *`;
    const availability = await pool.query(query, [
      ...attributes,
      workspaceId,
      doctorId,
    ]);
    if (availability.rowCount) return availability.rows[0];
    return false;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const deleteAvailability = async (attributes) => {
  try {
    const query = `delete from DoctorAvailability
                where workingDay=$1 and startTime=$2 and doctorId=$3 and workspaceId =$4`;
    const res = await pool.query(query, attributes);
    console.log(res);

    return res.rowCount;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const retrieveDoctorsStats = async () => {
  try {
    let query = `
    SELECT 
    SUM(CASE WHEN userState = 'Active' THEN 1 ELSE 0 END) AS activeDoctors,
    ROUND(SUM(CASE WHEN userState = 'Active' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(*), 0), 2) AS activePercentage,

    SUM(CASE WHEN userState = 'Pending' THEN 1 ELSE 0 END) AS pendingDoctors,
    ROUND(SUM(CASE WHEN userState = 'Pending' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(*), 0), 2) AS pendingPercentage,

    SUM(CASE WHEN userState = 'Blocked' THEN 1 ELSE 0 END) AS blockedDoctors,
    ROUND(SUM(CASE WHEN userState = 'Blocked' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(*), 0), 2) AS blockedPercentage

   
    FROM Users
    where userRole='Doctor'
    `;

    const res = await pool.query(query);
    return res.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const retrieveDoctorWorkspaces = async (id) => {
  try {
    const query = `
      SELECT 
        da.doctorid,
        workingday , 
        starttime , 
        endtime, 
        workspaceslocation,
        da.locationid,
        da.workspaceid
      FROM 
        DoctorAvailability da
      LEFT JOIN 
        WorkspaceLocations wl 
      ON 
        wl.workspaceId = da.workspaceId
        AND wl.locationId = da.locationId
      
      where doctorId=$1

      group by 
      da.doctorid,
      workingday , 
      starttime , 
      endtime, 
      workspaceslocation,
      da.locationid,
      da.workspaceid
    `;
    const res = await pool.query(query, [id]);
    return res.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const retrieveAllSpecializaions = async () => {
  try {
    const query = `
    select 
      distinct specialization
    from doctors 
  `;
    const res = await pool.query(query);
    return res.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export {
  retrieveAllDoctors,
  retrieveDoctor,
  reteieveDoctorPatients,
  createAvailability,
  deleteAvailability,
  retrieveDoctorsStats,
  retrieveDoctorWorkspaces,
  retrieveAllSpecializaions,
};
