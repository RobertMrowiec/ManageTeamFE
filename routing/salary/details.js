const Salary = require('../../models/salary')
const Project = require('../../models/project')
const { defaultResponse } = require('../common')

exports.get = defaultResponse(req => {
  return Salary.find().populate('projectId').populate('userId').exec()
})

exports.info = defaultResponse(req => {
  return Salary.findById(req.params.id).populate('projectId').populate('userId').exec()
})

exports.add = (req, res) => {
  return new Salary(req.body).save().then(() => {
    Project.findById(req.body.projectId).exec((err, founded) => {
      let update = {
        $inc: {salaries: 1},
        $set: {howmany: founded.howmany - req.body.value}
      }
      Project.findByIdAndUpdate(req.body.projectId, update, {new:true}).exec()
    })
  }).then(() => {
    return res.status(200).json('Done')
  })
}

exports.delete = defaultResponse(req => {
  return Salary.findByIdAndRemove(req.params.id).exec()
})

exports.update = defaultResponse(req => {
  return Salary.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec()
})
