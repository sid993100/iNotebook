const { connect } = require('mongoose');
const connectToMongo = require('./db');

connectToMongo();

//this line get get from express js--no need to learn
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Siddharth!')
})

app.listen(port, () => {
  console.log(`Url - http://localhost:${port}`)
})