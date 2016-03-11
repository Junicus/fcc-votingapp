var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan'); 1
var jwt = require('jsonwebtoken');
var config = require('./config/config');

var app = express();

var MongoDB = mongoose.connect(config.database).connection;

MongoDB.on('error', function(err) {
    console.log('Database error: ' + err.message);
});

MongoDB.on('open', function() {
    console.log('Connected to database');
});

var routes = require('./routes/index')(app);
var polls = require('./routes/polls')(app);
var login = require('./routes/login')(app);
var users = require('./routes/users')(app);
var authenticate = require('./routes/authenticate')(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.set('superSecret', config.secret);

app.use(express.static(path.join(__dirname, '../public')));

app.use(morgan('dev'));
/*app.use(function(req, res, next) {
    console.log({
        method: req.method,
        url: req.url
    });
    next();
});*/

app.get('/setup', function(req, res) {
    var nick = new User({
        name: 'Junicus',
        password: 'p@ssword',
        admin: true
    });

    nick.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    })
});

app.use('/', routes);
app.use('/api/polls', polls);
app.use('/login', login);
app.use('/users', users);
app.use('/authenticate', authenticate);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('pages/error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('pages/error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;