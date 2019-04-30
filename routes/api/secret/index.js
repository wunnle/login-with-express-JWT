const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.post('/api/secret', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authdata) => {
    if (error) {
      res.sendStatus(403)
    } else {
      res.json({
        message: 'Reached secret directory! 🍕',
        authdata
      })
    }
  })
})

function verifyToken(req, res, next) {
  // Get auth header value

  const bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined') {
    // Split at the space

    const bearerToken = bearerHeader.split(' ')[1]

    req.token = bearerToken

    next()

  } else {
    // Forbidden
    res.sendStatus(403)
  }
}

module.exports = app