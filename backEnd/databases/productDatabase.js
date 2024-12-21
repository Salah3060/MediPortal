import pool from "../../server.js";

const retrieveAllProducts = async (fields, filters, orders, limit, page) => {
  try {
    let query = "select ";
    if (fields) {
      query += fields;
    } else {
      query += `    
                p.productid,
                p.productprice,
                p.productstackquantity,
                p.productdescription,
                p.productexpirydate,
                p.manufacture,
                p.productname ,
                c.categoryName ,
                COALESCE(JSON_AGG(a.activeingredient) FILTER (WHERE a.activeingredient IS NOT NULL), '[]') AS activeingredients
                `;
    }

    query += `
              from MedicalProducts p  
              left join ActiveIngredients a  on p.productId = a.productId  
              left join Categories c on c.categoryId = p.productCategory
              where p.productstackquantity > 0
             `;

    if (filters)
      query += `
                and ${filters.join(" and ")}
                `;

    query += `
              group by p.productid ,
              c.categoryName   
             `;
    if (orders) query += `order by ${orders.join(" , ")}    `;
    query += ` LIMIT ${limit} OFFSET ${page - 1} * ${limit} ; `;
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const createProduct = async (attributes, activeIngredient) => {
  try {
    const query = `insert into MedicalProducts
                  ( productName,productPrice,productStackQuantity,productDescription,productExpiryDate,productCategory,manufacture)
                   values ($1,$2,$3,$4,$5,$6,$7)
                   returning *;              
    `;
    attributes[4] = new Date(new Date(attributes[4]).toISOString());
    const product = await pool.query(query, attributes);
    if (!product.rowCount) return 0;
    const secQuery = `insert into ActiveIngredients(activeIngredient,productId)
                      values($1,$2) returning *`;
    activeIngredient.forEach(async (ele) => {
      const res = await pool.query(secQuery, [ele, product.rows[0].productid]);
    });
    return product.rows[0];
  } catch (error) {
    console.log(error);
    return error;
  }
};
const updateProduct = async (attributes, productId) => {
  let query = `update MedicalProducts SET `;
  let cnt = 0;
  Object.entries(attributes).forEach(([k, v]) => {
    if (cnt && v) query += " , ";
    if (v) {
      query += k + " = " + `$${++cnt}`;
    }
  });
  query += ` where productId = $${++cnt}
    returning *`;
  const readyAtt = Object.values(attributes).filter((val) => val);
  console.log(query, attributes);
  const product = await pool.query(query, [...readyAtt, productId]);
  if (product.rowCount) return product.rows[0];
  return false;
};
export { retrieveAllProducts, createProduct, updateProduct };
