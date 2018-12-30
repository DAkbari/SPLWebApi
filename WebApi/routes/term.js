var person = require("../models/person");
var sqlInterface = require('../core/sql');
var authorize = require('../core/auth/authorize');

var express = require('express');
var router = express.Router();
const spName = '[Core].[Term_sp]';


////////////////////////
//////SearchTree////////
////////////////////////
router.get('/SearchTree/:name', async function (req, res, next) {
    let searchResult = await sqlInterface.exec(spName,
        ['kind', 'SearchTree'],
        ['Name', req.params.name]);
    res.send(searchResult[0]);
});
////////////////////////
//////Children//////////
////////////////////////
router.get('/Children/:id/:RowCountPerPage/:PageNo/:name?', async function (req, res, next) {
    console.log(req.params)
    let searchResult = await sqlInterface.exec(spName,
        ['kind', 'Children'],
        ['id', req.params.id],
        ['name', req.params.name == null ? '':req.params.name],
        ['RowCountPerPage', req.params.RowCountPerPage],
        ['PageNo', req.params.PageNo]);
    res.send(searchResult[0]);
});
////////////////////////
//////InsertChild///////
////////////////////////
router.post('/InsertChild', async function (req, res, next) {
    console.log(req.body)
    let searchResult = await sqlInterface.exec(spName,
        ['kind', 'InsertChild'],
        ['ParentID', req.body.ParentID],
        ['Name', req.body.Name],
        ['UserID', req.body.UserID]);
    res.send(searchResult);
});

module.exports = router;
