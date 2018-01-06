const Salary = require('../../models/salary')
const { defaultResponse } = require('../common')

exports.get = defaultResponse(req => {
  return Salary.find().populate('project').exec()
})

exports.info = defaultResponse(req => {
  return Salary.findById(req.params.id).populate('project').exec()
})

exports.add = defaultResponse(req => {
  return new Salary(req.body).save()
})

exports.delete = defaultResponse(req => {
  return Salary.findByIdAndRemove(req.params.id).exec()
})

exports.update = defaultResponse(req => {
  return Salary.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec()
})
