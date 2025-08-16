const pgp = require("pg-promise")();

const connection = process.env.DATABASE_URL || {
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "admin",
};

// Si es Render, habilitamos SSL
if (process.env.DATABASE_URL) {
  connection.ssl = { rejectUnauthorized: false }; // importante
}

const db = pgp(connection);

console.log("✅ pg-promise listo para usar con SSL");

module.exports = db;