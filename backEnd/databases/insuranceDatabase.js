import pool from "../../server.js";

const retrieveAllInsurances = async (fields, filters, orders, limit, page) => {
  try {
    let query = "select ";
    if (fields) query += fields;
    else
      query += `
                  i.insuranceId ,
                  i.startDate , 
                  i.duration , 
                  i.insuranceName,
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
    throw error;
  }
};

const createInsuranceProvider = async (attributes) => {
  try {
    const query = `insert into InsurancesProviders(providerName,providerLocation,providerPhone)
                  values($1,$2,$3) returning *`;
    const provider = await pool.query(query, attributes);
    if (provider.rowCount) return provider.rows[0];
    return false;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const createInsurance = async (attributes, providerId, workspaceId) => {
  try {
    const query = `insert into Insurances(startDate, duration,providerId)
                  values($1,$2,$3) returning *`;
    const insurance = await pool.query(query, [...attributes, providerId]);
    if (!insurance.rowCount) return false;
    const secQuery = `insert into Coverage(insuranceId,workspaceId)
                      values($1,$2) returning *`;
    const res = await pool.query(secQuery, [
      insurance.rows[0].insuranceid,
      workspaceId,
    ]);
    return insurance.rows[0];
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateInsurance = async (attributes, id) => {
  let query = `update Insurances SET `;
  let cnt = 0;
  Object.entries(attributes).forEach(([k, v]) => {
    if (cnt && v) query += " , ";
    if (v) {
      query += k + " = " + `$${++cnt}`;
    }
  });
  query += ` where insuranceId = $${++cnt}
    returning *`;
  const readyAtt = Object.values(attributes).filter((val) => val);
  const insurance = await pool.query(query, [...readyAtt, id]);

  if (insurance.rowCount) return insurance.rows[0];
  return false;
};

const updateInsuranceProvider = async (attributes, id) => {
  let query = `update InsurancesProviders SET `;
  let cnt = 0;
  Object.entries(attributes).forEach(([k, v]) => {
    if (cnt && v) query += " , ";
    if (v) {
      query += k + " = " + `$${++cnt}`;
    }
  });
  query += ` where providerId = $${++cnt}
    returning *`;
  const readyAtt = Object.values(attributes).filter((val) => val);
  const provider = await pool.query(query, [...readyAtt, id]);

  if (provider.rowCount) return provider.rows[0];
  return false;
};

export {
  retrieveAllInsurances,
  createInsuranceProvider,
  createInsurance,
  updateInsurance,
  updateInsuranceProvider,
};
