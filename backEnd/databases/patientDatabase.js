import pool from "../server.js";

const retrieveAllPatients = async (fields, filters, orders) => {
  try {
    let query = "select ";
    if (fields) query += fields;
    else
      query +=
        " userId, firstName, lastName, phoneNumber, email, gender, wallet, createdAt, updatedAt, birthDate ,  bloodType ,  chronicDisease ";
    query += `   from Users u  join Patients p on u .userId = p.PatientId   `;
    if (filters) query += `where ${filters.join(" and ")}`;
    if (orders) query += `order by ${orders.join(" , ")}`;
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.log(err);
  }
};

export { retrieveAllPatients };
