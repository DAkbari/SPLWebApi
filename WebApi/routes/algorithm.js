var sqlInterface = require('../core/sql');
var express = require('express');
var router = express.Router();
const spName = '[Core].[Entity_sp]';

router.get('/SelectMethods', async function (req, res, next) {
    try {
        let dbResult = await sqlInterface.exec(spName,
            ['kind', 'SelectMethods']);
        res.send(dbResult[0]);
    } catch (e) {
        req.error(e)
    }

});

module.exports = router;
