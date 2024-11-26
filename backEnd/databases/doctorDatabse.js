import pool from "../server.js";

const retrieveAllDoctors = async (fields, filters, orders) => {
  try {
    let query = "select ";
    if (fields) query += fields;
    else
      query +=
        " userId, firstName, lastName, phoneNumber, email, gender, wallet, createdAt, updatedAt, birthDate ,  licenseNumber ,  specialization , yearsOfExperience , about ";
    query += `   from Users u  join Doctors d on u .userId = d.doctorId   `;
    if (filters) query += `where ${filters.join(" and ")}`;
    if (orders) query += `order by ${orders.join(" , ")}`;
    console.log(query);
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.log(err);
  }
};

export { retrieveAllDoctors };
