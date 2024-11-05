const pool = require("./server");

(async () => {
  const client = await pool.connect();
  try {
    console.log("Connected to database successfully....");
    client.release();
  } catch (err) {
    console.error("Database connection error");
  }
})();
