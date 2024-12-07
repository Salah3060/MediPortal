import pool from "../server.js";

const retrieveAllQuestions = async (fields, filters, orders, limit, page) => {
  try {
    let query = "select ";
    if (fields) query += fields;
    else
      query += `q.questionId,
                q.patientId,
                CONCAT(up.firstName, ' ', up.lastName) AS patientName,
                q.speciality,
                q.question,
                q.answer,
                q.questionDate,
                q.answerDate,
                doctorId ,
                CONCAT(ud.firstName, ' ', ud.lastName) AS DoctorName
               `;
    query += `
            from Questions q
            LEFT JOIN 
                Users up ON up.userId = patientId
            LEFT JOIN 
                Users ud ON ud.userId = doctorId                 
    `;
    if (filters) query += `where ${filters.join(" and ")}       `;
    if (orders) query += `order by ${orders.join(" , ")}       `;
    query += ` LIMIT ${limit} OFFSET ${page - 1} * ${limit} ; `;
    const res = await pool.query(query);
    return res.rows;
  } catch (error) {
    console.log(error);
  }
};

export { retrieveAllQuestions };
