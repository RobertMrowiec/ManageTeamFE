const Project = require('../../models/project')
const { defaultResponse } = require('../common')

exports.get = defaultResponse(req => {
  return Project.find().exec()
})

exports.info = defaultResponse(req => {
  return Project.findById(req.params.id).exec()
})

exports.info = defaultResponse(req => {
  return Project.findById(req.params.id).exec()
})

exports.add = defaultResponse(req => {
  req.body.howmany = req.body.amount
  return new Project(req.body).save()
})

exports.delete = defaultResponse(req => {
  return Project.findByIdAndRemove(req.params.id).exec()
})

exports.update = defaultResponse(req => {
  return Project.findById(req.params.id).exec().then(found => {
    if (req.body.amount !== found.amount) req.body.howmany = req.body.amount - (found.amount - found.howmany)
    return console.log('I`ve got an update object');
  }).then(() => {
    Project.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec()
  })
})
