const express = require('express')
const router = express.Router()
const salary = require('./details')

router
    .get('/', salary.get)
    .get('/:id', salary.info)
    .post('/', salary.add)
    .delete('/:id', salary.delete)
    .put('/:id', salary.update)

module.exports = router
