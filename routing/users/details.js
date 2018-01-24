const User = require('../../models/user')
const Project = require('../../models/project')
const { defaultResponse } = require('../common')

exports.get = defaultResponse(req => {
  return User.find().populate('projects').exec()
})

exports.info = defaultResponse(req => {
  return User.findById(req.params.id).populate('projects').exec()
})

exports.add = (req, res) => {
  return new User(req.body).save().then((change) => {
    req.body.projects.forEach((project) => {
      Project.findByIdAndUpdate(project, { $inc: { peoples: 1 }}, {new: true}).exec()
    })
  }).then((result) => {
    res.status(200).json('Done')
  }).catch(err => res.status(400).json(err))
}

exports.delete = defaultResponse(req => {
  return User.findByIdAndRemove(req.params.id).exec()
})

exports.update = defaultResponse(req => {
  let tab = []
  return User.findById(req.params.id).exec().then(found => {
    return User.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec()
  })
})
