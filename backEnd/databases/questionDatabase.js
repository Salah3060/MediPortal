import pool from "../server.js";

const retrieveAllQuestions = async (fields, filters, orders, limit, page) => {
  try {
    let query = "select ";
    if (fields) query += fields;
    else
      query += `q.questionId,
                q.patientId,
                q.age ,
                q.gender,
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

const createQuestion = async (attributes) => {
  try {
    const query = `insert into Questions(patientId,speciality,question,questionDate,age,gender)
    values($1,$2,$3,$4,$5,$6)
    returning *;
    `;
    attributes[3] = new Date(new Date(attributes[3]).toISOString());
    const question = await pool.query(query, attributes);
    if (question.rowCount) return question.rows[0];
    return false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const answerQuestionDb = async (attributes) => {
  try {
    const query = `update questions
                   SET answer = $1 ,answerDate = $2,doctorId=$4
                   where questionId = $3
                   returning *;`;
    attributes[1] = new Date(new Date(attributes[1]).toISOString());
    const answer = await pool.query(query, attributes);
    if (answer.rowCount) return answer.rows[0];
    return false;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export { retrieveAllQuestions, createQuestion, answerQuestionDb };
