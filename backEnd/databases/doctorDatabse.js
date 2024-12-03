import pool from "../server.js";

const retrieveAllDoctors = async (fields, filters, orders, limit, page) => {
  try {
    let query = "select ";
    if (fields) query += fields;
    else
      query += ` userId, 
          firstName, 
          lastName, 
          phoneNumber,
          email, 
          gender, 
          wallet, 
          createdAt, 
          updatedAt, 
          birthDate ,  
          licenseNumber ,  
          specialization , 
          yearsOfExperience , 
          about ,
          fees,
          clinicLocation , 
          count(r.doctorId) as visitors , 
          CASE 
            WHEN AVG(r.rate) IS NOT NULL THEN round (AVG(r.rate), 2) 
            ELSE 0 
          END AS overallRating
          `;
    query += `   from Users u  
                join Doctors d on u .userId = d.doctorId     
                left join Reviews r on r.doctorId= d.doctorId  
                `;

    if (filters) query += `where ${filters.join(" and ")}       `;
    query += `  group by 
          userId, 
          firstName, 
          lastName, 
          phoneNumber,
          email, 
          gender, 
          wallet, 
          createdAt, 
          updatedAt, 
          birthDate ,  
          licenseNumber ,  
          specialization , 
          yearsOfExperience , 
          about ,
          fees,
          clinicLocation 
              `;
    if (orders) query += `order by ${orders.join(" , ")}       `;
    query += ` LIMIT ${limit} OFFSET ${page - 1} * ${limit} ; `;
    console.log(query);
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.log(err);
  }
};

export { retrieveAllDoctors };
