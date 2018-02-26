const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ProjectSchema = new Schema({
  name: {type: String, required: true},
  amount: {type: Number, required: true},
  peoples: {type: Number, default: 0},
  howmany: {type: Number, default: 0},
  salaries: {type: Number, default: 0}
})

module.exports = mongoose.model('Project', ProjectSchema)
