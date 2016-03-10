module.exports = function(app) {
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res) {
        res.render('pages/index');
    });

    router.get('/test', function(req, res) {
        res.send(app.get('env'));
    });

    return router;
};