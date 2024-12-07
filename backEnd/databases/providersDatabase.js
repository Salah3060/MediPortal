import pool from "../server.js";

const retrieveAllProviders = async (fields, filters, orders, limit, page) => {
  try {
    let query = "select ";
    if (fields) query += fields;
    else
      query += ` providerId, 
                 
          `;
  } catch (error) {
    console.log(error);
  }
};
