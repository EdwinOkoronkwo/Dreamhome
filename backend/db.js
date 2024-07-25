const mysql = require("mysql2/promise"); // Use promise-based mysql2

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "dream_home",
});

module.exports = pool; // Export the promise-based connection pool
