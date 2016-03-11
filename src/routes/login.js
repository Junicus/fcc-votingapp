module.exports = function(app) {
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res) {
        res.send('show login window');
    });

    router.post('/', function(req, res) {
        res.send('process login form');
    });

    return router;
};