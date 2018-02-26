const express = require('express')
const router = express.Router()
const login = require('./details')

router
    .post('/', login.post)
    .put('/', login.change)

module.exports = router
