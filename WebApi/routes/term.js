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
    try {
        let dbResult = await sqlInterface.exec(spName,
            ['kind', 'Select'],
            ['Name', req.body.Name == null ? '' : req.body.Name],
            ['RowCountPerPage', req.body.RowCountPerPage == null ? '50' : req.body.RowCountPerPage],
            ['PageNo', req.body.PageNo == null ? '1' : req.body.PageNo]);
        res.send(dbResult[0]);
    } catch (e) {
        req.error(e)
    }

});


////////////////////////
//SP Name:  Class
//Kind:     Select
//Name:     the name of the class to search for
////////////////////////
router.get('/Class/SelectClassEntity', async function (req, res, next) {
    try {
        let dbResult = await sqlInterface.exec(spName,
            ['kind', 'SelectClassEntity']);
        res.send(dbResult[0]);
    } catch (e) {
        req.error(e)
    }

});
////////////////////////
//SP Name:  Class
//Kind:     SelectPropertyRecommend
//Name:     the name of the class extended give recommendations
////////////////////////
router.post('/Class/SelectPropertyRecommend', async function (req, res, next) {
    try {
        let dbResult = await sqlInterface.exec(spName,
            ['kind', 'SelectPropertyRecommend'],
            ['Name', req.body.Name == null ? '' : req.body.Name],
            ['RowCountPerPage', req.body.RowCountPerPage == null ? '50' : req.body.RowCountPerPage],
            ['PageNo', req.body.PageNo == null ? '1' : req.body.PageNo]);
        res.send(dbResult[0]);
    } catch (e) {
        req.error(e)
    }
});

////////////////////////
//SP Name:  Class
//Kind:     Insert
//Name:     the name of the class
//UserId:   the user inserting the class
////////////////////////
router.post('/Class/Insert', async function (req, res, next) {
    try {
        let dbResult = await sqlInterface.exec(spName,
            ['kind', 'Insert'],
            ['Name', req.body.Name],
            ['UserID', req.body.UserID]);
        res.send(dbResult[0]);
    } catch (e) {
        req.error(e)
    }
});

////////////////////////
//SP Name:  Class
//Kind:     Update
//Name:     the new name of the class to update to
//UserId:   the ID of the class to update
//UserId:   the user updating the class
////////////////////////
router.post('/Class/Update', async function (req, res, next) {
    try {
        let dbResult = await sqlInterface.exec(spName,
            ['kind', 'Update'],
            ['Name', req.body.Name],
            ['ID', req.body.ID],
            ['UserID', req.body.UserID]);
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
router.delete('/Class/Delete/:id', async function (req, res, next) {
    try {
        let dbResult = await sqlInterface.exec(spName,
            ['kind', 'Delete'],
            ['ID', req.params.id]);
        res.send(dbResult[0]);
    } catch (e) {
        req.error(e)
    }
});


////////////////////////
//SP Name:  Class
//Kind:     SelectEx
//ID:       the id of the class to search for its properties
//PS:       5=>menu,
////////////////////////
router.get('/Class/SelectEx/:id', async function (req, res, next) {
    try {
        let dbResult = await sqlInterface.exec(spName,
            ['kind', 'SelectEx'],
            ['ID', req.params.id]);
        res.send(dbResult[0]);
    } catch (e) {
        req.error(e)
    }
});

////////////////////////
//SP Name:      Class
//Kind:         InsertEx
//ClassID:      the Id of the class to add property to
//Property:     the name of the new property
//DataType:     the dataType of the new property
////////////////////////
router.post('/Class/InsertEx', async function (req, res, next) {

    try {
        let dbResult = await sqlInterface.exec(spName,
            ['kind', 'InsertEx'],
            ['ID', req.body.ClassID],
            ['IsMultiSelect', req.body.IsMultiSelect],
            ['IsSearchable', req.body.IsSearchable],
            ['IsReferralID', req.body.IsID],
            ['IsRequired', req.body.IsRequired],
            ['Property', req.body.Property],
            ['DataType', req.body.DataType]);
        res.send(dbResult[0]);
    } catch (e) {
        req.error(e)
    }
});


////////////////////////
//SP Name:      Class
//Kind:         UpdateEx
//Property:     the name of the property to update
//DataType:     the dataType of the property to update
//ID:           the Id of the property to update
////////////////////////
router.post('/Class/UpdateEx', async function (req, res, next) {
    console.log(req.body)
    try {
        let dbResult = await sqlInterface.exec(spName,
            ['kind', 'UpdateEx'],
            ['Property', req.body.Property],
            ['IsMultiSelect', req.body.IsMultiSelect],
            ['IsSearchable', req.body.IsSearchable],
            ['IsID', req.body.IsID],
            ['IsRequired', req.body.IsRequired],
            ['DataType', req.body.DataType],
            ['ID', req.body.ID]);
        res.send(dbResult[0]);
    } catch (e) {
        req.error(e)
    }
});

////////////////////////
//SP Name:  Class
//Kind:     DeleteEx
//ID:       the Id of the property to delete
////////////////////////
router.delete('/Class/DeleteEx/:id', async function (req, res, next) {
    try {
        let dbResult = await sqlInterface.exec(spName,
            ['kind', 'DeleteEx'],
            ['ID', req.params.id]);
        res.send(dbResult[0]);
    } catch (e) {
        req.error(e)
    }
});


////////////////////////
//SP Name:  Class - با انتخاب یک ویژگی لیست کلاس هایی که همین ویژگی در آن تعریف شده است نمایش داده می شود
//Kind:     SelectProperty
//ID:       the Id of the property to delete
//Property: the Property name of the property which is being added
////////////////////////
router.post('/Class/SelectProperty', async function (req, res, next) {
    try {
        let dbResult = await sqlInterface.exec(spName,
            ['kind', 'SelectProperty'],
            ['Property', req.body.Property == null ? '' : req.body.Property],
            ['ID', req.body.ID]);
        res.send(dbResult[0]);
    } catch (e) {
        req.error(e)
    }
});


////////////////////////
//SP Name:  Term
//Kind:     Select
//Name:     the name of the class to search for
////////////////////////
router.post('/Term/Select', async function (req, res, next) {
    try {
        let dbResult = await sqlInterface.exec(spTermName,
            ['kind', 'Select'],
            ['Name', req.body.Name == null ? '' : req.body.Name],
            ['ClassID', req.body.ClassID],
            ['RowCountPerPage', req.body.RowCountPerPage == null ? '50' : req.body.RowCountPerPage],
            ['PageNo', req.body.PageNo == null ? '1' : req.body.PageNo]);
        res.send(dbResult[0]);
    } catch (e) {
        req.error(e)
    }
});
////////////////////////
//SP Name:  Term
//Kind:     SelectSimilarTerm
//Name:     the name of the term
//ClassID:  the id of the term's class
////////////////////////
router.post('/Term/SelectSimilarTerm', async function (req, res, next) {
    try {
        let dbResult = await sqlInterface.exec(spTermName,
            ['kind', 'SelectSimilarTerm'],
            ['Name', req.body.Name == null ? '' : req.body.Name],
            ['ClassID', req.body.ClassID]);
        res.send(dbResult[0]);
    } catch (e) {
        req.error(e)
    }
});
////////////////////////
//SP Name:      Term
//Kind:         InsertUpdate
//ClassID:      the Id of the class to add term to
//Value:        the string of the propertyid,value pairs
//Name:         the Name of the new/edited term
//ID            0 for inserts|| >0 for updates
////////////////////////
router.post('/Term/InsertUpdate', async function (req, res, next) {
    try {
        let dbResult = await sqlInterface.exec(spTermName,
            ['kind', 'InsertUpdate'],
            ['ID', req.body.ID],
            ['ClassID', req.body.ClassID],
            ['Value', req.body.Value],
            ['Name', req.body.Name]);
        res.send(dbResult[0]);
    } catch (e) {
        req.error(e)
    }
});

////////////////////////
//SP Name:  Term
//Kind:     Delete
//ID:       the Id of the Term to delete
////////////////////////
router.delete('/Term/Delete/:id', async function (req, res, next) {
    try {
        let dbResult = await sqlInterface.exec(spTermName,
            ['kind', 'Delete'],
            ['ID', req.params.id]);
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
router.post('/Term/SelectEx', async function (req, res, next) {
    try {
        let dbResult = await sqlInterface.exec(spTermName,
            ['kind', 'SelectEx'],
            ['ID', req.body.ID]);
        res.send(dbResult[0]);
    } catch (e) {
        req.error(e)
    }
});

////////////////////////
//SP Name:  Term
//Kind:     SearchClass
//Name:     the query to find
////////////////////////
router.post('/Term/SearchClass', async function (req, res, next) {
    try {
        let dbResult = await sqlInterface.exec(spTermName,
            ['kind', 'SearchClass'],
            ['Name', req.body.Name]);
        res.send(dbResult[0]);
    } catch (e) {
        req.error(e)
    }
});
module.exports = router;
