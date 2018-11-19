var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var sha1 = require('sha1');
var config = require('../core/auth/config');
var authorize = require('../core/auth/authorize');
var db = require('../core/sql')
router.post('/register', function (req, res) {

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    //store the user in the database
    var user = {id: 6462};
    //return res.status(500).send("There was a problem registering the user.")
    // create a token
    var token = jwt.sign({id: user.id}, config.secret, {
        expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({auth: true, token: token});
});

router.post('/login', async function (req, res) {
    //find req.body.user from database
    //should read user from database
    let dbUser = await db.exec("Authentication_sp", ['kind', 'authenticate'], ['user', req.body.user], ['password', req.body.password]);
    if (dbUser == null || dbUser.length == 0) return res.status(401).send({auth: false, token: null});
    else {
        var token = jwt.sign({id: dbUser[0].UserId,name:dbUser[0].Name}, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({auth: true, token: token});
    }
});

router.get('/me', authorize, function (req, res, next) {
    res.send(req.userId);
});
module.exports = router;
