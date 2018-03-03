const Salary = require('../../models/salary')
const Project = require('../../models/project')
const { defaultResponse } = require('../common')
const moment = require('moment')
exports.get = defaultResponse(req => {
  return Salary.find().populate('projectId').populate('userId').sort('-date').exec()
})

exports.userId = defaultResponse(req => Salary.find({userId: req.params.userId}).populate('projectId').populate('userId').sort('-date').exec())

exports.date = defaultResponse(async req => {

  if (req.params.date == 7) {
    betweenDate = await moment(new Date()).startOf('week')
    console.log(betweenDate);
  }
  else if (req.params.date == 30) {
    betweenDate = await moment(new Date()).startOf('month')
  }
  else if (req.params.date == 365) {
    betweenDate = await moment(new Date()).startOf('year')
  }
  else if (req.params.date == 0) {
    betweenDate = '01/01/2018'
  }
  return Salary.find({$and: [{userId: req.params.userId}, {date: {
    $gte: betweenDate
  }}]}).populate('projectId').populate('userId').sort('-date').exec()
})

exports.info = defaultResponse(req => {
  return Salary.findById(req.params.id).populate('projectId').populate('userId').exec()
})

exports.add = (req, res) => {
  return new Salary(req.body).save().then(() => {
    Project.findById(req.body.projectId).exec((err, founded) => {
      let update = {
        $inc: {salaries: 1},
        $set: {howmany: founded.howmany - req.body.amount}
      }
      Project.findByIdAndUpdate(req.body.projectId, update, {new:true}).exec()
    })
  }).then(() => {
    return res.status(200).json('Done')
  })
}

exports.delete = defaultResponse(req => {
  return Salary.findById(req.params.id).lean().exec().then(salary => {
    Project.findByIdAndUpdate(salary.projectId, {$inc: {howmany: salary.amount}}, {new:true}).exec()
  }).then(() => {
    return Salary.findByIdAndRemove(req.params.id).exec()
  })
})

exports.update = defaultResponse(req => {
  return Salary.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec()
})
