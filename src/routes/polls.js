module.exports = function(passport) {
  var express = require('express');
  var router = express.Router();
  var Poll = require('../models/poll');

  router.get('/', function(req, res) {
    res.render('polls', {
      title: 'Voting App - Polls'
    });
  });

  router.get('/:pollId', function(req, res) {
    Poll.findById(req.params.pollId, function(err, poll) {
      if (err) {
        res.status(500);
        res.send('Poll not found');
      } else {
        res.render('poll', {
          title: 'Voting App - ' + poll.title,
          poll: poll
        });
      }
    });
  });

  return router;
};
