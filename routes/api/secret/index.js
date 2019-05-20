const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express()

app.use(cors())
app.options('*', cors());

app.get('/api/secret', (req, res) => {
  res.json({
    message: 'welcome to the API'
  })
})


app.post('/api/secret', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authdata) => {
    if (error) {
      res.sendStatus(403)
    } else {
      let { password, ...dataWithoutPass } = authdata.user
      res.json({
        message: 'Reached secret directory! 🍕',
        user: dataWithoutPass,
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