const mysql = require("mysql2");

const connectDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: 'task',
})

module.exports = connectDB;
