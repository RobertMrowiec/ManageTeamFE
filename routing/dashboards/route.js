const express = require('express')
const router = express.Router()
const dashboard = require('./details')

router
    .get('/salaries', dashboard.get)

module.exports = router
