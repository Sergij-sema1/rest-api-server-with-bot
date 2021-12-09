require('dotenv').config();
const mysql2 = require('mysql2');
const config = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.passwordDb,
  database: process.env.database,
  port: process.env.port,
  charset: process.env.charset,
};
module.exports = mysql2.createPool(config);
