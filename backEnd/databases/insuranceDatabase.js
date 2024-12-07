import pool from "../server.js";

const retrieveAllInsurances = async (fields, filters, orders, limit, page) => {
  try {
    let query = "select ";
    if (fields) query += fields;
    else
      query += `
                  

                `;
    query += `  
            from Users u  
            join Doctors d on u .userId = d.doctorId     
            left join Reviews r on r.doctorId= d.doctorId  
                  `;

    if (filters) query += `where ${filters.join(" and ")}       `;

    if (orders) query += `order by ${orders.join(" , ")}       `;
    query += ` LIMIT ${limit} OFFSET ${page - 1} * ${limit} ; `;
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.log(err);
  }
};
