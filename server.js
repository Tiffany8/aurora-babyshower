import express from 'express'
import dotenv from 'dotenv'
import db from './db.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'
import pino from 'pino-http'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)
console.log('directory-name 👉️', __dirname)
console.log(path.join(__dirname, '/dist', 'index.html'))

dotenv.config()

const app = express()

app.use(pino())
app.use(express.json()) // parses incoming requests with JSON payloads
app.use(express.static(path.join(__dirname, 'dist')))
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(pino)

const listener = app.listen(3000, () => {
  console.log('App is listening on port ' + listener.address().port)
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.get('/ping', (req, res) => {
  return res.send('pong')
})

app.get('/rsvps', (req, res) => {
  db.query('SELECT * FROM rsvps', (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.post('/rsvps', (req, res) => {
  const insertQuery =
    'INSERT INTO rsvps (first_name, last_name, email, rsvp) VALUES (?, ?, ?, ?);'
  const selectQuery = 'SELECT rsvp, email FROM rsvps where email = ?'
  db.query(selectQuery, req.body.email, (err, result, field) => {
    if (err) {
      console.log(err)
    } else {
      if (result.length > 0) {
        console.log('results ', result[0])
        console.log('field ', field)
        res.send({
          msg: `You have already rsvped ${result[0].rsvp ? 'yes' : 'no'}`,
        })
      } else {
        db.query(
          insertQuery,
          [
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            req.body.rsvp,
          ],
          (err, result) => {
            if (err) {
              console.error(err)
            } else {
              console.log('created ', result)
              res.send({ msg: 'Success' })
            }
          },
        )
      }
    }
  })
})

app.put('/rsvps/:email', (req, res) => {
  const getQuery =
    'SELECT id, first_name, email, rsvp FROM rsvps WHERE email = ?'
  const updateQuery = 'UPDATE rsvps SET rsvp = ? WHERE email = ?'
  db.query(getQuery, [req.params.email], (err, result) => {
    if (err) {
      console.error(err)
    } else {
      if (req.body.rsvp !== result.rsvp) {
        db.query(
          updateQuery,
          [req.body.rsvp, req.params.email],
          (err, result) => {
            if (err) {
              console.log(err)
            } else {
              res.send({
                msg: `Rsvp updated to ${req.body.rsvp ? 'yes' : 'no'}`,
              })
            }
          },
        )
      } else {
        res.send({
          msg: `Already rsvped ${result.rsvp ? 'yes' : 'no'}`,
        })
      }
    }
  })
})
