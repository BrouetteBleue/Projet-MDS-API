let mysql = require('mysql');

const host =  process.env.HOST;
const user =  process.env.USER;
const password =  process.env.PASSWORD;
const database =  process.env.DATABASE;

let db = mysql.createConnection({
  host: host,
  user: user,
  password:password,
  database: database  
})

db.connect()

module.exports = db