var passport = require('passport');
var Strategy = require('passport-local').Strategy;

module.exports = {
    step1: function () {
        passport.use(new Strategy(
            function (username, password, cb) {
                //connect to db and authenticate
                cb(null, {id: username, name: 'amin', lname: 'nourian'})
            }));

        passport.serializeUser(function (user, cb) {
            cb(null, {id: user.id, name: user.name});
        });

        passport.deserializeUser(function (id, cb) {
            //connect to db and read user info
            cb(null, {id: id, name: 'amin', lname: 'nourian'})
        });
    },
    step2: function (app) {
        app.use(require('express-session')({secret: 'keyboard cat', resave: false, saveUninitialized: false}));
        app.use(passport.initialize());
        app.use(passport.session());
    }
}
