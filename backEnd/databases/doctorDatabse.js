import pool from "../server.js";

const retrieveAllDoctors = async (fields, filters) => {
  try {
    let query = "select ";
    if (fields) query += fields;
    else query += "*";
    query += `   from Users u  join Doctors d on u .userId = d.doctorId   `;
    if (filters) query += `where ${filters.join(" and ")}`;
    console.log(query);
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.log(err);
  }
};

export { retrieveAllDoctors };
