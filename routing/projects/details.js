const Project = require('../../models/project')
const User = require('../../models/user')
const { defaultResponse } = require('../common')
const forEP = require('foreach-promise');

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
  req.body.peoples = req.body.users.length
  return new Project(req.body).save().then(saved => {
    console.log(req.body.users)
    
    req.body.users.forEach(async user => {
      await User.findByIdAndUpdate(user,  { $push: { projects: saved._id }}, {new: true})
    })
    return saved
  })
})

exports.delete = defaultResponse(req => {
  return Project.findByIdAndRemove(req.params.id).exec().then(() => {
    User.find().exec().then(users => {

    })
  })
})

exports.update = defaultResponse(req => {  
  req.body.peoples = req.body.users.length
  return Project.findById(req.params.id).exec().then(found => {
    if (req.body.amount !== found.amount) req.body.howmany = req.body.amount - (found.amount - found.howmany)
    return console.log('I`ve got an update object');
  }).then(() => {
    Project.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec().then(saved => {
      return saved.users.forEach(async user => {
        await User.findById(user).lean().exec().then(user => {
          if (user.projects) {
            user.projects = user.projects.filter(x => x != saved._id)
            user.projects.push(saved._id)
            return User.findByIdAndUpdate(user._id, {$push: {projects: user.projects}}).exec().then(user => console.log(user))
          }
          else {
            user.projects = [saved._id]
            console.log(user);
            return User.findByIdAndUpdate(user._id, {$set: {projects: user.projects}}).exec().then(user => console.log(user)
            )
          }
        })
      })
    })
  })
})
