const express = require('express')
const bodyParser = require('body-parser')
const { compare } = require('../../../password-helper')
const jwt = require('jsonwebtoken')
const cors = require('cors')


const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())
app.options('*', cors());

const users = [
  {
    id: 1,
    username: 'wunnle',
    email: 'sinanaksay@gmail.com',
    password: '$2b$10$KVSCG.JCK81fhPRPw0.KLusOLqr6DibIGaGCprV75tvt4GxzzNrOW'
  },
  {
    id: 2,
    username: 'leyda',
    email: 'leydaaltun@gmail.com',
    password: '$2b$10$yvvXErblvEj6TyqnesxlGOvRQgrBBO9rB44b7wiQQukIIANbtJ3ha'
  }
]

app.post('/api/login', (req, res) => {
  const user = users.find(user => user.username === req.body.username && compare(req.body.password, user.password))

  if (user) {
    jwt.sign({ user }, 'secretkey', { expiresIn: '2 days' }, (error, token) => {
      res.json({ token })
    })
  } else {
    res.sendStatus(403)
  }
})

module.exports = app