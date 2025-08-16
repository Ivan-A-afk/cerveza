const pgp = require("pg-promise")();

let connection;

if (process.env.DATABASE_URL) {
  // Conexión a Render con SSL
  connection = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  };
} else {
  // Conexión local
  connection = {
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "admin"
  };
}

const db = pgp(connection);

console.log("✅ pg-promise listo para usar con SSL");

module.exports = db;