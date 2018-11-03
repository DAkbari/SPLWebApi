import {person} from "../models/person";

var express = require('express');
var router = express.Router();

/* GET terms listing. */
router.get('/data', function (req, res, next) {
    res.send([{test: 1, test2: 2}, {test: 4, test2: 5}]);
});
/* GET terms listing. */
router.post('/data', function (req, res, next) {
    var p = new person();
    p.hello();
    p.hello(1);
    res.send([{test: p.hello(), test2: 2}, {test: 4, test2: 5}]);
});

module.exports = router;
