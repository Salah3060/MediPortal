import pool from "./server.js";

const createUserTable = `create table Users
    (
        userId int , 
    )`;

async function test1(query) {
  try {
    const res = await pool.query(query);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
