import pool from "../server.js";

const retrieveAllInsurances = async (fields, filters, orders, limit, page) => {
  try {
    let query = "select ";
    if (fields) query += fields;
    else
      query += `
                  i.insuranceId ,
                  i.startDate , 
                  i.duration , 
                  i.providerId , 
                  JSON_AGG (
                            JSON_BUILD_OBJECT (
                                                'workSpaceId' , w.workspaceId  ,
                                                'workSpaceName' ,w.workspaceName,
                                                'workSpaceType' , w.workSpaceType
                                              )
                           ) as workSpaces

                `;
    query += `  
            from Insurances i 
            LEFT JOIN 
              InsurancesProviders ip ON ip.providerId = i.providerId
            LEFT JOIN 
              coverage c ON c.insuranceId = i.insuranceId
            LEFT JOIN 
              Workspaces w ON w.workspaceId = c.workspaceId
                  `;

    if (filters) query += `where ${filters.join(" and ")}       `;
    query += ` group by 
              i.insuranceId ,
              i.startDate , 
              i.duration , 
              i.providerId 
              
    `;

    if (orders) query += `order by ${orders.join(" , ")}       `;
    query += ` LIMIT ${limit} OFFSET ${page - 1} * ${limit} ; `;
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.log(err);
  }
};

export { retrieveAllInsurances };
