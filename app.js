const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const blogRoutes = require('./routes/blog')

const app = express()
const port = process.env.PORT || 8080

app.use(bodyParser.json()) // application/json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use('/blog', blogRoutes)

app.use((error, req, res, next) => {
  console.log(error)
  const status = error.statusCode || 500
  const message = error.message
  const data = error.data
  res.status(status).json({ message: message, data: data })
})

mongoose
  .connect(
    'mongodb://127.0.0.1:27017/post', { useNewUrlParser: true }
  )
  .then(result => {
    app.listen(port, (req, res) => {
      console.log(`Listening on port: ${port}`)
    })
  })
  .catch(err => console.log(err))
