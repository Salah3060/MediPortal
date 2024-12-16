import pool from "../server.js";

const retrieveUsersStats = async (role) => {
  try {
    let query = `
      SELECT 
      SUM(CASE WHEN userState = 'Active' THEN 1 ELSE 0 END) AS active${role}s,
      ROUND(SUM(CASE WHEN userState = 'Active' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(*), 0), 2) AS activePercentage,
  
      SUM(CASE WHEN userState = 'Pending' THEN 1 ELSE 0 END) AS pending${role}s,
      ROUND(SUM(CASE WHEN userState = 'Pending' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(*), 0), 2) AS pendingPercentage,
  
      SUM(CASE WHEN userState = 'Blocked' THEN 1 ELSE 0 END) AS blocked${role}s,
      ROUND(SUM(CASE WHEN userState = 'Blocked' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(*), 0), 2) AS blockedPercentage
  
     
      FROM Users
      where userRole=$1
      `;

    const res = await pool.query(query, [role]);
    return res.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const retrieveTableSize = async (table) => {
  try {
    const query = `select count(*) as ${table}Number from ${table}`;
    const res = await pool.query(query);
    return res.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const retrieveAppointmentsMonthlyStats = async () => {
  try {
    let query = `
        SELECT 
          EXTRACT(MONTH FROM appointmentDate) AS month,
          COUNT(*) AS appointmentCount
        FROM 
          appointments
        GROUP BY 
          EXTRACT(MONTH FROM appointmentDate)
        ORDER BY 
          month;
    `;
    const res = await pool.query(query);
    return res.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const retrieveOrdersMonthlyStats = async () => {
  try {
    let query = `
        SELECT 
          EXTRACT(MONTH FROM orderDate) AS month,
          COUNT(*) AS orderCount
        FROM 
          orders
        GROUP BY 
          EXTRACT(MONTH FROM orderDate)
        ORDER BY 
          month;
    `;
    const res = await pool.query(query);
    return res.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export {
  retrieveUsersStats,
  retrieveAppointmentsMonthlyStats,
  retrieveOrdersMonthlyStats,
  retrieveTableSize,
};
