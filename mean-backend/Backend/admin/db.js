const mysql = require('mysql2')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'DAC',
  database: 'cdac_project',
  password: 'DAC',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})


module.exports = pool