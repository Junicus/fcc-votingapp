module.exports = function(app) {
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res) {
        res.render('pages/index');
    });

    router.get('/about', function(req, res) {
        res.send('about page w/Test: ' + app.get('env'));
    });

    return router;
};