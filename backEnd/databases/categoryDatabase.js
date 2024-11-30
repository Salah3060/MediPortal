import pool from "../server.js";

const retrieveAllCategories = async () => {
  try {
    const query = "select * from Categories ";
    const res = await pool.query(query);
    return res.rows;
  } catch (error) {}
};

export { retrieveAllCategories };
