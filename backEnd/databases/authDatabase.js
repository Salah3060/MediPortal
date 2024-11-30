import pool from "../server.js";

const logInDb = async (email, password) => {
  try {
    const query = `select * from Users where email=$1 and password=$2`;
    const res = await pool.query(query, [email, password]);
    if (res.rowCount) return res.rows[0];
    return false;
  } catch (error) {
    console.log(error.mesaage);
  }
};

export { logInDb };
