const express = require('express')
const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')


const app = express()

const users = [
  {
    id: 1,
    username: 'wunnle',
    email: 'sinanaksay@gmail.com',
    password: '123456'
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

  const user = users.find(user => user.username === req.body.username && user.password === req.body.password)

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