"use strict";

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var indexRouter = require('./dist/routes/index');

var usersRouter = require('./dist/routes/users');

var termRouter = require('./dist/routes/term');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/core/term', termRouter);
module.exports = app;

//# sourceMappingURL=app.js.map