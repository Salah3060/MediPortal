import pool from "../server.js";

const retrieveAllProviders = async (fields, filters, orders, limit, page) => {
  try {
    let query = "select ";
    if (fields) query += fields;
    else
      query += ` p.providerId, 
                 p.providerName,
                 p.providerLocation ,
                 JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'contactId',pc.contactId
                            'providerPhone' ,pc.providerPhone
                        )
                    ) As contacts
          `;
    query += `
            from InsurancesProviders p
            LEFT JOIN 
                InsuranceProviderContacts pc ON pc.providerId = p.providerId
    `;
    query += `
           GROUP BY 
           p.providerId, 
           p.providerName,
           p.providerLocation 
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

export { retrieveAllProviders };
