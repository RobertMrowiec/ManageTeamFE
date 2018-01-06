const Project = require('../../models/project')
const { defaultResponse } = require('../common')

exports.get = defaultResponse(req => {
  return Project.find().exec()
})

exports.info = defaultResponse(req => {
  return Project.findById(req.params.id).exec()
})

exports.add = defaultResponse(req => {
  return new Project(req.body).save()
})

exports.delete = defaultResponse(req => {
  return Project.findByIdAndRemove(req.params.id).exec()
})

exports.update = defaultResponse(req => {
  return Project.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec()
})
