const Project = require('../../models/project')
const User = require('../../models/user')
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
  return new Project(req.body).save().then(saved => {
    console.log(req.body.users)
    
    req.body.users.forEach(async user => {
      await User.findByIdAndUpdate(user,  { $push: { projects: saved._id }}, {new: true})
    })
    return saved
  })
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
