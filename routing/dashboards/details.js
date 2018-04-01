const User = require('../../models/user')
const Salary = require('../../models/salary')
const { defaultResponse } = require('../common')
const forEP = require('foreach-promise')
exports.get = (req, res) => {
  let salariesArray = []
  let usersArray = []
  let date = new Date();
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return User.find().lean().exec().then(users => {
    forEP(users, user => {
      usersArray.push(user.name)
      return Salary.find({userId: user._id, date: {$gt: firstDay, $lt: lastDay}}).lean().exec().then(salaries => {
        let salariesSum = 0
        if (salaries.length == 0) {
          salariesArray.push(0)
        }
        else {
          forEP(salaries, salary => salariesSum += salary.amount).then(() => salariesArray.push(salariesSum))
        }
      })
    }).then(() => res.json({
      imiona: usersArray,
      sumy: salariesArray
    }))
    ;
  })
}
