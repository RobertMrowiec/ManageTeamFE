const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ProjectSchema = new Schema({
  name: {type: String, required: true},
  amount: {type: Number, required: true}
})

module.exports = mongoose.model('Project', ProjectSchema)
