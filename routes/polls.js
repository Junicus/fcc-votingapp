var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send('Hello World from polls, should return polls')
});

router.post('/', function(req, res) {
    res.send('Posted to polls, should store new poll');
});

module.exports = router;