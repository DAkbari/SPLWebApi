var person = require("../models/person");
var sqlInterface = require('../core/sql');
var authorize = require('../core/auth/authorize');

var express = require('express');
var router = express.Router();
const spName = '[Core].[Entity_sp]';


////////////////////////
//SP Name:  Entity
//Kind:     SearchTree
//Name:     the name of the Entity to search for
////////////////////////
router.post('/SearchTree', async function (req, res, next) {
    try {
        let dbResult = await sqlInterface.exec(spName,
            ['kind', 'SearchTree'],
            ['Name', req.body.Name == null ? '' : req.body.Name],
            ['RowCountPerPage', req.body.RowCountPerPage == null ? '50' : req.body.RowCountPerPage],
            ['PageNo', req.body.PageNo == null ? '1' : req.body.PageNo]);
        res.send(dbResult[0]);
    } catch (e) {
        req.error(e)
    }

});

////////////////////////
//SP Name:  Entity
//Kind:     SearchTree
//Name:     the name of the Entity to search for
////////////////////////
router.post('/Children', async function (req, res, next) {
    try {
        let dbResult = await sqlInterface.exec(spName,
            ['kind', 'Children'],
            ['Name', req.body.Name == null ? '' : req.body.Name],
            ['ParentID', req.body.ParentID == null ? 0 : req.body.ParentID],
            ['RowCountPerPage', req.body.RowCountPerPage == null ? '50' : req.body.RowCountPerPage],
            ['PageNo', req.body.PageNo == null ? '1' : req.body.PageNo]);
        res.send(dbResult[0]);
    } catch (e) {
        req.error(e)
    }

});

module.exports = router;