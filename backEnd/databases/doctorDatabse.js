import pool from "../server.js";

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
          END AS overallRating
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
          'workspaceId', da.workspaceId,
          'workingDay', da.workingDay,
          'startTime', da.startTime,
          'endTime', da.endTime,
          'locations', (
            SELECT 
              JSON_AGG(
                JSON_BUILD_OBJECT(
                  'locationId', l.locationId,
                  ' workspacesLocation',  workspacesLocation
                )
              )
            FROM 
              WorkspaceLocations l
            WHERE 
              l.workspaceId = da.workspaceId 
          )
        )
      ) AS availability, 
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'rate', r.rate,
          'review', r.review,
          'reviewDate', r.reviewDate,
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

export { retrieveAllDoctors, retrieveDoctor };
