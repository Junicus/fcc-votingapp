module.exports = function(passport) {
  var express = require('express');
  var router = express.Router();

  var isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  };

  router.get('/', function(req, res) {
    res.render('index', {
      title: 'Voting App',
      message: req.flash('message')
    });
  });

  router.get('/callback',
    passport.authenticate('auth0', {
      failureRedirect: '/'
    }),
    function(req, res) {
      if (!req.user) {
        throw new Error('user null');
      }
      res.redirect('/');
    });

  return router;
};
