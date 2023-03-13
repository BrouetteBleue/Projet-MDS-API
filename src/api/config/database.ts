//import mysql from 'mysql';
const mysql = require('mysql');
import * as dotenv from 'dotenv'
import config from './config'


dotenv.config({ path: '../../../.env' })


const host: string | undefined =  config.DB_HOST;
const user: string | undefined  =  config.USER;
const password: string | undefined  =  config.PASSWORD;
const database: string | undefined  =  config.DATABASE;



const db = mysql.createConnection({
  host: host,
  user: user,
  password:password,
  database: database  
})



db.connect()

export {db} 