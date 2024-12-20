import pool from "../../server.js";

const createOrder = async (attributes, cart, userId) => {
  try {
    let query = `insert into Orders(orderDate, totalAmount,orderStatus,patientId)
                 values($1,$2,$3,$4)
                 returning *`;
    attributes[0] = new Date(new Date(attributes[0]).toISOString());
    const order = await pool.query(query, [...attributes, userId]);
    if (!order.rowCount) return false;
    const orderId = order.rows[0].orderid;
    const secQuery = `insert into OrderProductRelation(orderId,productId,productQuantity)
    values($1,$2,$3) returning *`;
    cart.forEach(async (element) => {
      const att = [orderId, element.productId, element.productQuantity];
      const res = await pool.query(secQuery, att);
    });
    console.log(order.rows[0]);
    return order.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateOrder = async (status, id) => {
  try {
    const query = `update Orders set orderStatus = $1
                  where orderId = $2
                  returning *`;

    const order = await pool.query(query, [status, id]);
    if (order.rowCount) return order.rows[0];
    return false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const retrieveAllorders = async (fields, filters, orders, limit, page) => {
  try {
    let query = "select ";
    if (fields) query += fields;
    else
      query += `   
              o.orderId,
              o.orderDate,
              o.patientId,
              u.firstName, 
              u.lastName, 
              o.totalAmount, 
              JSON_AGG(
                  JSON_BUILD_OBJECT(
                      'productId', op.productId,
                      'productName', p.productName,
                      'productQuantity', op.productQuantity,
                      'manufacture', p.manufacture,
                      'productPrice', p.productPrice
                  )
              ) AS products
`;

    query += `
            FROM 
              Orders o
            LEFT JOIN 
              OrderProductRelation op ON op.orderId = o.orderId
            LEFT JOIN 
              Users u ON u.userId = o.patientId
            LEFT JOIN 
              MedicalProducts p ON p.productId = op.productId
`;

    if (filters) query += `where ${filters.join(" and ")}      `;

    query += `
           group by 
              o.orderId ,
              o.orderDate,
              o.patientId,
              u.firstName , 
              u.lastName , 
              totalAmount

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

export { createOrder, updateOrder, retrieveAllorders };
