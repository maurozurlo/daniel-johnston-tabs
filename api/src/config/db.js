const mysql = require('mysql2')
require('dotenv').config();

if (!process.env.DATABASE_URL) {
    console.warn("Missing Database URL, using container...")
}

const CONFIG = process.env.DATABASE_URL ? process.env.DATABASE_URL : {
    port: 3306,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}

const pool = mysql.createPool(CONFIG)
const promisePool = pool.promise();

console.log("DB connected")

module.exports = promisePool
