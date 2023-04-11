#!/usr/bin/node
import fs from 'fs'
import path from 'path'
import mysql from 'mysql'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config()
// import { MysqlError } from 'mysql'

console.log(process.env)
const setup = async () => {
  db.connect(async (err) => {
    if (err) {
      console.log('error connecting ->', err)
    } else {
      // eslint-disable-next-line no-undef
      const rsvps = fs.readFileSync(path.join(__dirname, 'db.sql')).toString()
      const query = await db.query(rsvps, (err, result) => {
        if (err) {
          console.error('error ', err)
        } else {
          console.log('db setup complete ', query)
        }
      })
    }
  })
}

setup()
