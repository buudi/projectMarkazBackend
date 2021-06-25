const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    password: process.env.DB_PASS,
    port: 5432,
    database: process.env.DB_NAME
});

module.exports = pool;