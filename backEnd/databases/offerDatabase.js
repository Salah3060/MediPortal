import pool from "../server.js";

const retrieveAllOffers = async (fields, filters, orders, limit, page) => {
  try {
    let query = "select ";
    if (fields) query += fields;
    else
      query += `    offerId,
                    offerName,
                    offerDescription,
                    percentage , 
                    startdate , 
                    enddate , 
                    d.doctorId , 
                    d.fees,
                    w.workspaceid ,
                    specialization ,  
                    firstname ,
                    lastname ,
                    w.workspacename,
                    w.workspacetype
                    `;
    query += ` from Offers o 
              left join Doctors d  on  o.doctorId = d.doctorId
              left join Users u on u.userId = d.doctorId
              left join Workspaces w on o.workspaceId = w.workspaceId
              `;
    if (filters) query += `where ${filters.join(" and ")}      `;
    if (orders) query += `order by ${orders.join(" , ")}       `;
    query += ` LIMIT ${limit} OFFSET ${page - 1} * ${limit} ; `;
    console.log(query);
    const res = await pool.query(query);
    return res.rows;
  } catch (error) {
    console.log(error);
  }
};

export { retrieveAllOffers };