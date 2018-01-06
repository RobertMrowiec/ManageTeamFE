const User = require('../../models/user')
const { defaultResponse } = require('../common')

exports.get = defaultResponse(req => {
  return User.find().populate('projects').exec()
})

exports.info = defaultResponse(req => {
  return User.findById(req.params.id).populate('projects').exec()
})

exports.add = defaultResponse(req => {
  return new User(req.body).save()
})

exports.delete = defaultResponse(req => {
  return User.findByIdAndRemove(req.params.id).exec()
})

exports.update = defaultResponse(req => {
  return User.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec()
})
