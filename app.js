const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const { compare } = require('./password-helper')


const app = express()

const users = [
  {
    id: 1,
    username: 'wunnle',
    email: 'sinanaksay@gmail.com',
    password: '$2b$10$KVSCG.JCK81fhPRPw0.KLusOLqr6DibIGaGCprV75tvt4GxzzNrOW'
  }
]

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api', (req, res) => {
  res.json({
    message: 'welcome to the API'
  })
})

app.post('/api/posts', verifyToken, (req, res) => {

  jwt.verify(req.token, 'secretkey', (error, authdata) => {
    if (error) {
      res.sendStatus(403)
    } else {
      res.json({
        message: 'Post created!',
        authdata
      })
    }
  })

})

app.post('/api/login', (req, res) => {

  const user = users.find(user => user.username === req.body.username && compare(req.body.password, user.password))

  if (user) {
    jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (error, token) => {
      res.json({ token })
    })
  } else {
    res.sendStatus(403)
  }
})

// Verify Token
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

app.listen(5000, () => console.log('Server started on port 5000'))