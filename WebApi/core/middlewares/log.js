var util = require("util");

function log(req, res, next) {
    console.log('body',util.inspect(req.body));
    next();
}

module.exports = log;