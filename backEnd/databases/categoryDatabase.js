import pool from "../../server.js";

const retrieveAllCategories = async () => {
  try {
    const query = "select * from Categories ";
    const res = await pool.query(query);
    return res.rows;
  } catch (error) {}
};
const createCategoryDb = async (attributes) => {
  try {
    const query = `insert into Categories(categoryName,categoryDescription)
                  values($1,$2) returning *`;
    const category = await pool.query(query, attributes);
    if (category.rowCount) return category.rows[0];
    return false;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const updateCategory = async (attributes, categoryId) => {
  try {
    let query = `update Categories SET `;
    let cnt = 0;
    Object.entries(attributes).forEach(([k, v]) => {
      if (cnt && v) query += " , ";
      if (v) {
        query += k + " = " + `$${++cnt}`;
      }
    });
    query += ` where categoryId = $${++cnt}
      returning *`;
    const readyAtt = Object.values(attributes).filter((val) => val);
    const category = await pool.query(query, [...readyAtt, categoryId]);
    if (category.rowCount) return category.rows[0];
    return false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { retrieveAllCategories, createCategoryDb, updateCategory };
