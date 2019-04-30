const express = require('express');
const app = express()

app.get('/api', (req, res) => {
  res.json({
    message: 'welcome to the API'
  })
})

module.exports = app