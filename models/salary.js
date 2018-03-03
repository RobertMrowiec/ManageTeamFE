const mongoose = require('mongoose')
const Schema = mongoose.Schema

let SalarySchema = new Schema({
  date: {type: Date, required: true, default: Date.now()},
  amount: {type: Number, required: true},
  userId: { type: Schema.Types.ObjectId, ref: 'User'},
  projectId: { type: Schema.Types.ObjectId, ref: 'Project'},
  title: String
})

module.exports = mongoose.model('Salary', SalarySchema)
