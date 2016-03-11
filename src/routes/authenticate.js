module.exports = function(app) {
    var express = require('express');
    var router = express.Router();
    var User = require('../models/user');

    router.post('/', function(req, res) {
        User.findOne({
            name: req.body.name
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {
                if (user.password != req.body.password) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {
                    var token = jwt.sign(user, app.get('superSecret'), {
                        expiresInMinutes: 1440
                    });

                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            }
        });
    });

    return router;
};