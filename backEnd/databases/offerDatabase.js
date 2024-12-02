import pool from "../server.js";

const retrieveAllOffers = async (fields, filters, orders) => {
  try {
    let query = "select ";
    if (fields) query += fields;
    else
      query += `    percentage , 
                    startdate , 
                    enddate , 
                    d.doctorId , 
                    w.workspaceid , 
                    specialization ,  
                    firstname ,
                    lastname ,
                    w.workspacename,
                    w.workspacetype
                    `;
    query += ` from Offers o 
              join Doctors d  on  o.doctorId = d.doctorId
              join Users u on u.userId = d.doctorId
              join Workspaces w on o.workspaceId = w.workspaceId
              `;
    if (filters) query += `where ${filters.join(" and ")}      `;
    if (orders) query += `order by ${orders.join(" , ")}       `;
    const res = await pool.query(query);
    return res.rows;
  } catch (error) {
    console.log(error);
  }
};

export { retrieveAllOffers };
