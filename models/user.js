const mongoose = require('mongoose')
const Schema = mongoose.Schema

let UserSchema = new Schema({
  email: {type: String, required: true},
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project'}],
  name: {type: String, required: true},
  surname: {type: String, required: true}
})

module.exports = mongoose.model('User', UserSchema)
