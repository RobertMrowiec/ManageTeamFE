const User = require('../../models/user')
const { defaultResponse } = require('../common')
const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy

exports.post = (req, res) => {
  passport.authenticate('local', { 
    failureRedirect: '/login',
  }),
  function(req, res) {
    res.redirect('/test')
  }
}

exports.change = defaultResponse(req => {

})

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use(new LocalStrategy(
  (email, password, done) => {
    return User.findOne({ 'email': email }).exec().then((err, user) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    }).catch(console.log)
  }
));
