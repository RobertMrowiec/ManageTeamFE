const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const passport = require('passport')
LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(passport.initialize());
app.use(passport.session());

mongoose.Promise = Promise

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

const allowedOrigins = ['http://localhost:3000']

app.use(require('surprise-cors')(allowedOrigins))

app.use('/api/users', require('./routing/users/route'))
app.use('/api/projects', require('./routing/projects/route'))
app.use('/api/salaries', require('./routing/salary/route'))
app.use('/login', require('./routing/login/route'))
module.exports = (dbUrl) => {
  return mongoose.connect(process.env.MONGODB_URI || dbUrl).then(x => {
    return app
  })
};
