const pgp = require("pg-promise")();

// Si existe DATABASE_URL (Render), usarla; si no, fallback a local
const connection = process.env.DATABASE_URL || {
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "admin",
};

const db = pgp(connection);

console.log("✅ pg-promise listo para usar");

module.exports = db;