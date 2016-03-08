var express = require('express');
var path = require('path');
var app = express();

var routes = require('./routes/index');
var polls = require('./routes/polls');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/polls', polls);

module.exports = app;