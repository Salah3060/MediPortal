import app from "../app.js";
import pool from "../server.js";
import { catchAsyncError } from "../utilities.js";

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
                  d.fees,
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

const createAppointmentDb = async (attributes) => {
  try {
    const query = `insert into Appointments
                   (appointmentDate, appointmentStatus, fees, paymentStatus, bookingDate, patientId, doctorId, workspaceId) 
                   values($1,$2,$3,$4,$5,$6,$7,$8)
                   returning *`;
    attributes[4] = new Date(new Date(attributes[4]).toISOString());
    const appointment = await pool.query(query, attributes);
    // console.log(appointment);
    if (appointment.rowCount) return appointment.rows[0];
    return false;
  } catch (error) {
    console.log(error);
  }
};

export { retrieveAllAppointments, createAppointmentDb };
