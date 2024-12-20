import pool from "../../server.js";

const createReview = async (attributes) => {
  try {
    const query = `insert into reviews(doctorId,patientId,rate,review,waitingTime,reviewDate)
                   values ($1 , $2 , $3 , $4 , $5 , $6)
                  RETURNING *`;
    attributes[5] = new Date(new Date(attributes[5]).toISOString());
    console.log(attributes);
    const review = await pool.query(query, attributes);
    if (review.rowCount) return review.rows[0];
    return false;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const updateReview = async (attributes, doctorId, patientId) => {
  try {
    let query = `update Reviews SET `;
    let cnt = 0;
    Object.entries(attributes).forEach(([k, v]) => {
      if (cnt && v) query += " , ";
      if (v) {
        query += k + " = " + `$${++cnt}`;
      }
    });
    query += ` where doctorId = $${++cnt} and patientId=$${++cnt}
    returning *`;
    const readyAtt = Object.values(attributes).filter((val) => val);
    const review = await pool.query(query, [...readyAtt, doctorId, patientId]);
    if (review.rowCount) return review.rows[0];
    return false;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export { createReview, updateReview };
