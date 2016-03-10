module.exports = function(app, mongoose) {
    var express = require('express');
    var router = express.Router();
    var Poll = require('../models/poll');

    router.get('/', function(req, res) {
        res.send('Hello World from polls, should return polls: ' + req.body);
    });

    router.post('/', function(req, res) {
        console.log(req.body);
        
        var poll = new Poll();
        poll.title = req.body.title;
        poll.owner = 'Junicus';
        poll.options = ['option1', 'option2'];

        console.log('poll: ', poll);

        bear.save(function(err) {
            if (err) {
                console.log('Error in saving post on db: ' + err);
                res.status(500);
                res.send(err);
            }

            res.json({ message: 'Poll Created' });
        });
    });

    router.get('/:poll_id', function(req, res) {
        var poll_id = req.params['poll_id'];
        if (typeof poll_id == 'numeric' && !isNan(poll_id)) {
            res.send('Should get single poll with id: ' + poll_id);
        } else {
            res.send('there is an error, poll_id should be numeric and is ' + typeof (poll_id));
        }
    });

    router.delete('/:poll_id', function(req, res) {
        res.send('Should delete single poll with id: ' + req.params["poll_id"]);
    });

    return router;
};