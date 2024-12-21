import pool from "../../server.js";

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
                    w.workspacetype ,
                    JSON_AGG(wl.locationId) as locations
                    `;
    query += ` from Offers o 
              left join Doctors d  on  o.doctorId = d.doctorId
              left join Users u on u.userId = d.doctorId
              left join Workspaces w on o.workspaceId = w.workspaceId
              left join WorkspaceLocations wl on wl.workspaceId = w.workspaceId
              `;
    if (filters) query += `where ${filters.join(" and ")}      `;

    query += `
          group by 
          offerId,
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
    if (orders) query += `order by ${orders.join(" , ")}       `;
    query += ` LIMIT ${limit} OFFSET ${page - 1} * ${limit} ; `;
    const res = await pool.query(query);
    return res.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createOfferDb = async (attributes) => {
  try {
    const query = `insert into Offers(percentage,startDate,endDate,doctorId,workspaceId,offerDescription,offerName)
                  values($1,$2,$3,$4,$5,$6,$7)
                  returning *;
    `;
    const offer = await pool.query(query, attributes);
    if (offer.rowCount) return offer.rows[0];
    return false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateOfferDb = async (offerId, attributes) => {
  try {
    let query = `update Offers SET `;
    let cnt = 0;
    Object.entries(attributes).forEach(([k, v]) => {
      if (cnt && v) query += " , ";
      if (v) {
        query += k + " = " + `$${++cnt}`;
      }
    });

    query += ` where offerId = $${++cnt}
              returning *;`;
    const readyAtt = Object.values(attributes).filter((val) => val);
    // console.log([...readyAtt, offerId]);
    const offer = await pool.query(query, [...readyAtt, offerId]);
    if (offer.rowCount) return offer.rows[0];
    return false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteOffer = async (offerId) => {
  try {
    const query = `delete from Offers where offerId = $1`;
    const res = await pool.query(query, [offerId]);
    return res.rowCount;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export { retrieveAllOffers, createOfferDb, updateOfferDb, deleteOffer };
