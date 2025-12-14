// db.js
const { Pool } = require("pg");
const config = require("./config");

const pool = new Pool({
  user: config.database.user,
  host: config.database.host,
  database: config.database.database,
  password: config.database.password,
  port: config.database.port,
});

async function executeQueries(queries) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    for (const query of queries) {
      await client.query(query);
    }
    await client.query("COMMIT");
    console.log("Database initialized successfully");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error initializing database:", error.stack);
  } finally {
    client.release();
  }
}

const initQueries = [
  `
  CREATE TABLE IF NOT EXISTS public.posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(255),
    content VARCHAR(255),
    image VARCHAR(255),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS public.users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255)
  );
  `
  
];

async function initDatabase() {
  await executeQueries(initQueries);
}

async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log("Executed query", { text, duration, rows: res.rowCount });
  return res;
}

initDatabase()

module.exports = {
  query,
  pool,
};
