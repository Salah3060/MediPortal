import pool from "../server.js";

const retrieveStats = async (role) => {
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

export { retrieveStats };
