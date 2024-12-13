import pool from "../server.js";

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

export { createOrder, updateOrder };
