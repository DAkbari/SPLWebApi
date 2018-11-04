var person = require("../models/person");
var sqlInterface = require('../sql/sql');

var express = require('express');
var router = express.Router();

/* GET terms listing. */
router.post('/data', function (req, res, next) {
    res.send([{test: 1, test2: 2}, {test: 4, test2: 5}]);
});
/* GET terms listing. */
router.get('/data', function (req, res, next) {
    var p = new person();
    sqlInterface.execSQL("select * FROM [kowsar_his].[ATD].[PatientInfo]").then(res.send);
    // res.send([{test: p.hello(), test2: 2}, {test: 4, test2: 5}]);
});

module.exports = router;
