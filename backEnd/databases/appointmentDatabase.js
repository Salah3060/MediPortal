import pool from "../server.js";

const retrieveAllAppointments = async (
  fields,
  filters,
  orders,
  limit,
  page
) => {
  try {
    let query = "select ";
    if (fields) query += fields;
    else
      query += ` 
                  a.appointmentId,
                  a.appointmentDate,
                  a.appointmentStatus,
                  a.fees,
                  a.bookingDate,
                  a.paymentStatus,
                  a.doctorId ,
                  ud.firstName as doctorFirstName ,
                  ud.lastName as doctorlastName ,
                  d.specialization ,
                  a.patientId ,
                  up.firstName as patientFirstName , 
                  up.lastName as patientlastName,
                  a.workspaceId ,
                  w.workspaceName,
                  w.workspaceType 

                  `;
    query += `
                  from Appointments a 
                  join doctors d on d.doctorId = a.doctorId
                  join workspaces w on w.workspaceId =  a.workspaceId 
                  join Users  ud  on ud.userId = a.doctorId 
                  join Users  up on up.userId = a.patientId
                  `;
    if (filters) query += `where ${filters.join(" and ")}       `;
    if (orders) query += `order by ${orders.join(" , ")}       `;
    query += ` LIMIT ${limit} OFFSET ${page - 1} * ${limit} ; `;
    console.log(query);
    const res = await pool.query(query);
    return res.rows;
  } catch (error) {
    console.log(error);
  }
};

export { retrieveAllAppointments };
