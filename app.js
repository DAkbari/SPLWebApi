var passport = require('passport');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var auth= require('./core/auth');
auth.step1();

var loginRouter = require('./routes/login');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var termRouter = require('./routes/term');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

auth.step2(app);

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/core/term', termRouter);

module.exports = app;

