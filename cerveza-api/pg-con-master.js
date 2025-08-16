const pgp = require("pg-promise")();

let cn;

cn = {
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "admin",
};

// console.log(cn)
const db = pgp(cn);
module.exports = db;
