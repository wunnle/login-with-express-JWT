const express = require('express')
const app = express()

const api = require('./routes/api/')
const login = require('./routes/api/login')
const secret = require('./routes/api/secret')

app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.use(api)
app.use(login)
app.use(secret)

app.listen(5000, () => console.log('Server started on port 5000'))