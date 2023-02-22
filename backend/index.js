const { connect } = require('mongoose');
const connectToMongo = require('./db');

connectToMongo();

//this line get get from express js--no need to learn
const express = require('express')
const app = express()
const port = 3000

//Available Routes
// app.get('/', (req, res) => {
//   res.send('Hello Siddharth!')
// })

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Url - http://localhost:${port}`)
})