module.exports = function(app) {
    var express = require('express');
    var router = express.Router();
    var Poll = require('../models/poll');

    router.get('/', function(req, res) {
        Poll.find(function(err, polls) {
            if (err) {
                res.status(500);
                res.send(err);
            }

            res.json(polls);
        })
    });

    router.post('/', function(req, res) {
        console.log(req.body);

        var poll = new Poll();
        poll.title = req.body.title;
        poll.owner = 'Junicus';
        poll.options = ['option1', 'option2'];

        console.log('poll: ', poll);

        poll.save(function(err) {
            if (err) {
                console.log('Error in saving post on db: ' + err);
                res.status(500);
                res.send(err);
            }

            res.json({ message: 'Poll Created', poll: poll });
        });
    });

    router.get('/:poll_id', function(req, res) {
        Poll.findById(req.params.poll_id, function(err, poll) {
            if (err) {
                res.status(404);
                res.send(err);
            } else {
                res.json(poll);
            }
        });
    });

    router.put('/:poll_id', function(req, res) {
        Poll.findById(req.params.poll_id, function(err, poll) {
            poll.title = req.body.title;
            poll.options = req.body.options;
            poll.closed = req.body.closed;

            poll.save(function(err) {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else {
                    res.json({ message: 'Poll Updated!', poll: poll });
                }
            })
        });
        res.send('ok');
    });

    router.delete('/:poll_id', function(req, res) {
        Poll.remove({
            _id: req.params.poll_id
        }, function(err, poll) {
            if (err) {
                res.status(500);
                res.send(err);
            } else {
                res.json({ message: 'Successfully deleted!', poll: poll });
            }
        });
    });

    return router;
};