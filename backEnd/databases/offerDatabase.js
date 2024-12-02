import pool from "../server.js";

const retrieveAllOffers = async (fields, filters, orders) => {
  try {
    let query = "select ";
    if (fields) query += fields;
    else query += `* `;
    query +=` from Offers o 
              join Doctors d 
              
              `
  } catch (error) {
    console.log(error);
  }
};
