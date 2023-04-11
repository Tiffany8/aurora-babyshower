#!/usr/bin/node
import fs from 'fs'
import path from 'path'
import mysql from 'mysql'
import dotenv from 'dotenv'
import util from 'util'

dotenv.config()

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  multipleStatements: true,
  connectionLimit: 10,
})

db.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }
  }
  if (connection) connection.release()
})

db.query = util.promisify(db.query)

export default db
