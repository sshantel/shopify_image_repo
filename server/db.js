const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "poop",
  port: 5432,
  database: "albums",
});

module.exports = pool;
