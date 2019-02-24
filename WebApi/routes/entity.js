var person = require("../models/person");
var sqlInterface = require('../core/sql');
var authorize = require('../core/auth/authorize');

var express = require('express');
var router = express.Router();
const spName = '[Core].[Entity_sp]';
const classSpName = '[Core].[Class_sp]';


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



////////////////////////
//SP Name:  Class_sp
//Kind:     SelectEx
//id:       the name of the entity to obtain its properties ... (menu,category,group,question,attributes)
////////////////////////
router.get('/Properties/:id', async function (req, res, next) {
    try {
        let dbResult = await sqlInterface.exec(classSpName,
            ['kind', 'SelectEx'],
            ['ID', req.params.id === 'menu'?5:(req.params.id === 'category'?6:(req.params.id === 'group'?7:(req.params.id === 'question'?8:(req.params.id === 'attribute'?9:0))))]);
        res.send(dbResult[0]);
    } catch (e) {
        req.error(e)
    }
});



////////////////////////
//SP Name:  Term
//Kind:     SelectEx
//Name:     the id of the term to get its extended
////////////////////////
router.post('/SelectEx', async function (req, res, next) {
    try {
        let dbResult = await sqlInterface.exec(spName,
            ['kind', 'SelectEx'],
            ['ID', req.body.ID]);
        res.send(dbResult[0]);
    } catch (e) {
        req.error(e)
    }
});
router.post('/SelectSimilar', async function (req, res, next) {
    try {
         let dbResult = await sqlInterface.exec(spName,
             ['kind', 'SelectSimilar'],
             ['Name', req.body.Name == null ? '' : req.body.Name],
             ['ParentId', req.body.ParentId],
             ['EntityLevel', req.body.EntityLevel]);
         res.send(dbResult[0]);
    } catch (e) {
        req.error(e)
    }
});
////////////////////////
//SP Name:      Entity
//Kind:         InsertUpdate
//ParentId:     the Id of the parent entity
//Value:        the string of the propertyid,value pairs
//Name:         the Name of the new/edited term
//ID            0 for inserts|| >0 for updates
////////////////////////
router.post('/InsertUpdate', async function (req, res, next) {
    try {
        let dbResult = await sqlInterface.exec(spName,
            ['kind', 'InsertUpdate'],
            ['ID', req.body.ID],
            ['ParentId', req.body.ParentId],
            ['Value', req.body.Value],
            ['EntityLevel', req.body.EntityLevel],
            ['Name', req.body.Name]);
        res.send(dbResult[0]);
    } catch (e) {
        req.error(e)
    }
});
router.post('/InsertSimilar', async function (req, res, next) {
    try {
        let dbResult = await sqlInterface.exec(spName,
            ['kind', 'InsertSimilar'],
            ['ID', req.body.ID],
            ['ParentId', req.body.ParentId]);
        res.send(dbResult[0]);
    } catch (e) {
        req.error(e)
    }
});

////////////////////////
//SP Name:  Class
//Kind:     Delete
//ID:       the Id of the class to delete
////////////////////////
router.delete('/Delete/:id', async function (req, res, next) {
    try {
        let dbResult = await sqlInterface.exec(spName,
            ['kind', 'Delete'],
            ['ID', req.params.id]);
        res.send(dbResult[0]);
    } catch (e) {
        req.error(e)
    }
});
module.exports = router;