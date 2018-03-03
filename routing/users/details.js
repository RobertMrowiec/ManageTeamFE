const User = require('../../models/user')
const Project = require('../../models/project')
const Salary = require('../../models/salary')
const { defaultResponse } = require('../common')

exports.get = defaultResponse(req => {
  return User.find().populate('projects').exec()
})

exports.info = defaultResponse(req => {
  return User.findById(req.params.id).populate('projects').exec()
})

exports.add = defaultResponse(async req => {
  return new User(req.body).save()
})

exports.update = defaultResponse(async req => {
    return User.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec()
})

exports.delete = defaultResponse(req => {
  return Salary.find({userId: req.params.id}).lean().exec().then(async salaries => {
    await salaries.forEach(salary => {
      Salary.findByIdAndRemove(salary._id).exec()
    })
  }).then(() => {
    return User.findByIdAndRemove(req.params.id).exec()
  })
})

exports.deleteProject = defaultResponse(async req => {
  return User.findById(req.params.userId).lean().exec().then(async user => {
    user.projects = await user.projects.filter(x => x != req.params.projectId)
    return User.findByIdAndUpdate(req.params.userId, user, {new: true}).exec()
  })
})