var express = require('express');
var path = require('path');
var router = express.Router();
var passport = require('passport');

router.post('/',
    passport.authenticate('local', {failureRedirect: '/login'}),
    function (req, res) {
        res.redirect('/');
    });
router.get('/',
    function (req, res) {
        res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
    });
router.get('/logout',
    function(req, res){
        req.logout();
        res.redirect('/');
    });
module.exports = router;


