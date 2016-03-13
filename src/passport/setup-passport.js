var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var auth0config = require('./authConfig');

var strategy = new Auth0Strategy(auth0config,
  function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  });

passport.use(strategy);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = strategy;
