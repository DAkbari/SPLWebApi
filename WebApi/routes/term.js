var person = require("../models/person");
var sqlInterface = require('../core/sql');
var authorize = require('../core/auth/authorize');

var express = require('express');
var router = express.Router();
const spName = '[Core].[Class_sp]';
const spTermName = '[Core].[Term_sp]';


////////////////////////
//SP Name:  Class
//Kind:     Select
//Name:     the name of the class to search for
////////////////////////
router.post('/Class/Select', async function (req, res, next) {
    let searchResult = await sqlInterface.exec(spName,
        ['kind', 'Select'],
        ['Name', req.body.Name == null ? '' : req.body.Name],
        ['RowCountPerPage', req.body.RowCountPerPage == null ? '50' : req.body.RowCountPerPage],
        ['PageNo', req.body.PageNo == null ? '1' : req.body.PageNo]);
    console.log(searchResult)
    res.send(searchResult[0]);
});

////////////////////////
//SP Name:  Class
//Kind:     Insert
//Name:     the name of the class
//UserId:   the user inserting the class
////////////////////////
router.post('/Class/Insert', async function (req, res, next) {
    console.log(req.body.Name,req.body.UserID)
    let searchResult = await sqlInterface.exec(spName,
        ['kind', 'Insert'],
        ['Name', req.body.Name],
        ['UserID', req.body.UserID]);
    res.send(searchResult[0]);
});

////////////////////////
//SP Name:  Class
//Kind:     Update
//Name:     the new name of the class to update to
//UserId:   the ID of the class to update
//UserId:   the user updating the class
////////////////////////
router.post('/Class/Update', async function (req, res, next) {
    let searchResult = await sqlInterface.exec(spName,
        ['kind', 'Update'],
        ['Name', req.body.Name],
        ['ID', req.body.ID],
        ['UserID', req.body.UserID]);
    res.send(searchResult[0]);
});

////////////////////////
//SP Name:  Class
//Kind:     Delete
//ID:       the Id of the class to delete
////////////////////////
router.delete('/Class/Delete/:id', async function (req, res, next) {

    let searchResult = await sqlInterface.exec(spName,
        ['kind', 'Delete'],
        ['ID', req.params.id]);
    res.send(searchResult[0]);
});


////////////////////////
//SP Name:  Class
//Kind:     Select
//ID:     the id of the class to search for its properties
////////////////////////
router.get('/Class/SelectExt/:id', async function (req, res, next) {
    let searchResult = await sqlInterface.exec(spName,
        ['kind', 'SelectExt'],
        ['ID', req.params.id]);
    res.send(searchResult[0]);
});

////////////////////////
//SP Name:      Class
//Kind:         InsertExt
//ClassID:      the Id of the class to add property to
//Property:     the name of the new property
//DataType:     the dataType of the new property
////////////////////////
router.post('/Class/InsertExt', async function (req, res, next) {
    let searchResult = await sqlInterface.exec(spName,
        ['kind', 'InsertExt'],
        ['ID', req.body.ClassID],
        ['IsMultiSelect', req.body.IsMultiSelect],
        ['IsRequired', req.body.IsRequired],
        ['Property', req.body.Property],
        ['DataType', req.body.DataType]);
    res.send(searchResult[0]);
});


////////////////////////
//SP Name:      Class
//Kind:         UpdateExt
//Property:     the name of the property to update
//DataType:     the dataType of the property to update
//ID:           the Id of the property to update
////////////////////////
router.post('/Class/UpdateExt', async function (req, res, next) {
    let searchResult = await sqlInterface.exec(spName,
        ['kind', 'UpdateExt'],
        ['Property', req.body.Property],
        ['IsMultiSelect', req.body.IsMultiSelect],
        ['IsRequired', req.body.IsRequired],
        ['DataType', req.body.DataType],
        ['ID', req.body.ID]);
    res.send(searchResult[0]);
});

////////////////////////
//SP Name:  Class
//Kind:     DeleteExt
//ID:       the Id of the property to delete
////////////////////////
router.delete('/Class/DeleteExt/:id', async function (req, res, next) {
    let searchResult = await sqlInterface.exec(spName,
        ['kind', 'DeleteExt'],
        ['ID', req.params.id]);
    res.send(searchResult[0]);
});




////////////////////////
//SP Name:  Term
//Kind:     Select
//Name:     the name of the class to search for
////////////////////////
router.post('/Term/Select', async function (req, res, next) {
    let searchResult = await sqlInterface.exec(spTermName,
        ['kind', 'Select'],
        ['Name', req.body.Name],
        ['ClassID', req.body.ClassID],
        ['RowCountPerPage', req.body.RowCountPerPage == null ? '50' : req.body.RowCountPerPage],
        ['PageNo', req.body.PageNo == null ? '1' : req.body.PageNo]);
    console.log(searchResult)
    res.send(searchResult[0]);
});
////////////////////////
//SP Name:      Term
//Kind:         InsertUpdate
//ClassID:      the Id of the class to add term to
//Value:       the string of the propertyid,value pairs
//Name:         the Name of the new/edited term
//ID            0 for inserts|| >0 for updates
////////////////////////
router.post('/Term/InsertUpdate', async function (req, res, next) {
    console.log(req.body)
    let searchResult = await sqlInterface.exec(spTermName,
        ['kind', 'InsertUpdate'],
        ['ID', req.body.ID],
        ['ClassID', req.body.ClassID],
        ['Value', req.body.Value],
        ['Name', req.body.Name]);
    res.send(searchResult[0]);
});

////////////////////////
//SP Name:  Term
//Kind:     Delete
//ID:       the Id of the Term to delete
////////////////////////
router.delete('/Term/Delete/:id', async function (req, res, next) {
    let searchResult = await sqlInterface.exec(spTermName,
        ['kind', 'Delete'],
        ['ID', req.params.id]);
    res.send(searchResult[0]);
});

module.exports = router;
