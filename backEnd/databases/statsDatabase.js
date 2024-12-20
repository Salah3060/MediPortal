import pool from "../../server.js";

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
          WITH months AS (
      SELECT generate_series(1, 12) AS month
    )
    SELECT 
      m.month,
      COALESCE(COUNT(a.appointmentDate), 0) AS appointmentCount
    FROM 
      months m
    LEFT JOIN 
      appointments a
    ON 
      EXTRACT(MONTH FROM a.appointmentDate) = m.month
    GROUP BY 
      m.month
    ORDER BY 
      m.month;

    `;
    const res = await pool.query(query);
    return res.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const retrieveOrdersMonthlyStats = async () => {
  try {
    let query = `
    WITH months AS (
    SELECT generate_series(1, 12) AS month
  )
  SELECT 
    m.month,
    COALESCE(COUNT(o.orderDate), 0) AS orderCount
  FROM 
    months m
  LEFT JOIN 
    orders o
  ON 
    EXTRACT(MONTH FROM o.orderDate) = m.month
  GROUP BY 
    m.month
  ORDER BY 
    m.month;

    `;
    const res = await pool.query(query);
    return res.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const retieveAppointmentsTotoalMoney = async () => {
  try {
    const query = `
                  select 
                    sum(d.fees) as appointmentsTotoalMoney
                  from 
                     Appointments a 
                  left join 
                    doctors d on d.doctorId = a.doctorId
                  where a.appointmentStatus!='Cancelled'
    `;
    const res = await pool.query(query);
    return res.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const retieveOrdersTotoalMoney = async () => {
  try {
    const query = `
                  select 
                    sum(totalAmount) as ordersTotalMoney
                  from Orders 
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
  retieveAppointmentsTotoalMoney,
  retieveOrdersTotoalMoney,
};
