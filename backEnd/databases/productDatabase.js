import pool from "../server.js";

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
  }
};

export { retrieveAllProducts };
