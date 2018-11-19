var person = require("../models/person");
var sqlInterface = require('../core/sql');
var authorize = require('../core/auth/authorize');

var express = require('express');
var router = express.Router();

/* GET terms listing. */
router.post('/data', function (req, res, next) {
    res.send([{test: 1, test2: 2}, {test: 4, test2: 5}]);
});
/* GET terms listing. */
router.get('/data',authorize, async function (req, res, next) {
    console.log(req.userId);
    // var p = new person();
     //let x1 = await sqlInterface.exec("Core.Term_Sp",['kind','SelectTree'],['ID','0']);
     let x2 = await sqlInterface.query("select * FROM [kowsar_his].[ATD].[PatientInfo] where FirstName = @P0 and PatientCode = @P1",'حسن',8700001);
     res.send(x2);



});


module.exports = router;
