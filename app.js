const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.Promise = Promise

const allowedOrigins = ['http://localhost:3000']

app.use(require('surprise-cors')(allowedOrigins))

app.use('/api/users', require('./routing/users/route'))
app.use('/api/projects', require('./routing/projects/route'))
app.use('/api/salaries', require('./routing/salary/route'))

module.exports = (dbUrl) => {
  return mongoose.connect(process.env.MONGODB_URI || dbUrl).then(x => {
    return app
  })
};
