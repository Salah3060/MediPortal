const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "../BE.env" });

// Database connection
const { Pool } = require("pg");
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PORT } = process.env;
const pool = new Pool({
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
    require: true,
  },
});

(async () => {
  const client = await pool.connect();
  try {
    console.log("Connected to database successfully....");
    client.release();
  } catch (err) {
    console.error("Database connection error");
  }
})();

const port = PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server starts listening on port ${port}....`);
});

module.exports = pool;
