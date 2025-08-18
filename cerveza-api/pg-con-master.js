const pgp = require("pg-promise")();

let connection;

if (process.env.DATABASE_URL) {
  // Producción: Render
  connection = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  };
  console.log("✅ Conectando a la base de datos de Render (producción)");
} else {
  // Desarrollo: desde tu PC a la base de datos de Render
  connection = {
    host: "dpg-d2gds775r7bs73f00850-a.oregon-postgres.render.com", // host de Render
    port: 5432,
    database: "cerveza_db", // nombre de la DB en Render
    user: "cerveza_db_user", // usuario de Render
    password: "kp1U1Ros25DzjGitem0vAbX5kA2r6k2N", // contraseña
    ssl: { rejectUnauthorized: false }, // obligatorio para Render
  };
  console.log("✅ Conectando a la base de datos de Render desde local");
}

const db = pgp(connection);

module.exports = db;