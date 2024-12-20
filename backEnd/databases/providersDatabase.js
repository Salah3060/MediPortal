import pool from "../../server.js";

const retrieveAllProviders = async (fields, filters, orders, limit, page) => {
  try {
    let query = "select ";
    if (fields) query += fields;
    else
      query += ` p.providerId, 
                 p.providerName,
                 p.providerLocation ,
                 p.providerPhone
          `;
    query += `
            from InsurancesProviders p
    `;
    if (filters) query += `where ${filters.join(" and ")}       `;
    if (orders) query += `order by ${orders.join(" , ")}       `;
    query += ` LIMIT ${limit} OFFSET ${page - 1} * ${limit} ; `;
    const res = await pool.query(query);
    return res.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { retrieveAllProviders };
