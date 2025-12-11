module.exports = {
  jwtSecret: "5Uy0awtZ44g",
  database: {
    host: process.env.POSTGRES_HOST || "localhost",
    database: process.env.POSTGRES_DB || "WAD202526",
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "WAD202526",
    port: process.env.POSTGRES_PORT
      ? parseInt(process.env.POSTGRES_PORT)
      : 5432,
  },
};
