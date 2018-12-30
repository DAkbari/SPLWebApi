var express = require('express');
var router = express.Router();
var path = require('path');
var sql = require('../core/sql');
var fs = require('fs')


/* GET home page. */
router.get('/', function (req, res, next) {
    res.send({})
});
router.get('/menu/:id', async function (req, res, next) {
    var mn = {id: req.params.id, categories: []};
    let dbMenu = (await sql.exec("SPL.Structure_sp",
        ['kind', 'DataDictionary'],
        ['userid', '5371'],
        ['menuid', req.params.id],
        ['lng', 'fa'],
        ['levelParam', 'all']))[0];
    let dbCategories = (groupBy2(dbMenu.filter(v => v.StructureType === 'C'), "ID"));
    for (let dbCat of dbCategories) {
        let cat = {id: dbCat.key, groups: []};
        cat.title = getValue(dbCat.items, 'Caption');

        let dbGroups = (groupBy2(dbMenu.filter(v => v.StructureType === 'G' && v.CategoryID === parseInt(dbCat.key)), "ID"));
        for (let dbGroup of dbGroups) {
            let group = {questions: []};
            group.title = getValue(dbGroup.items, 'Caption');
            group.id = dbGroup.key;
            console.log(group.id, cat.id)
            group.groupInfo = {type: 'form'}
            let dbQuestions = (groupBy2(dbMenu.filter(v => v.StructureType === 'A' && v.CategoryID === parseInt(dbCat.key) && v.GroupID === parseInt(dbGroup.key)), "ID"));
            for (let dbQuestion of dbQuestions) {
                let question = {};
                question.title = getValue(dbQuestion.items, 'Caption');
                question.source = getValue(dbQuestion.items, 'SourceID');
                let format = ',' + getValue(dbQuestion.items, 'Format') + ',';
                question.id = dbQuestion.key;
                question.groupId = dbGroup.key;
                question.categoryId = dbCat.key;
                question.menuId = req.params.id;
                question.style = getValue(dbQuestion.items, 'Tool');
                question.validation = [];
                if (format.toLowerCase().indexOf(',op,') === -1)
                    question.validation.push({name: 'required'});
                question.fieldInfo = {
                    name: format.indexOf(',L,') >= 0 ? 'select' : 'text',
                    source: {
                        script: getValue(dbQuestion.items, 'SourceID')
                    },
                    style: question.style != null ? (eval('(function(){' + question.style.replace('js:', '') + '})()')) : null
                };

                group.questions.push(question);
            }
            cat.groups.push(group);
        }
        mn.categories.push(cat);
    }
    fs.readFile('flow.json', function (error, data) {
       // mn.categories[1].groups[0].flow = JSON.parse(data.toString());
        res.send({menu: mn});
    });
});
router.get('/report/:reportId/:fkId', async function (req, res, next) {
    let dbReportMeta = await sql.exec("pub.reportprint_sp",
        ['kind', 'SelectReportFromSpl'],
        ['id', req.params.reportId],
        ['fk', req.params.fkId]);
    let cmd = (dbReportMeta[2][0][""]);
    let dbReportData = await sql.query(cmd.replace('{fk}', req.params.fkId).replace('{Language}', '"fa"'));
    let reportData = [[], []]
    for (let dbRep of dbReportData[0]) {
        let value = dbReportData[1].filter(f => f.ID.toString() === dbRep.ID.toString())
        reportData[0].push({
            title: dbRep["ItemExpr"],
            columnSpacing: dbRep["ItemHZSpace"],
            row: dbRep["ItemPriority"],
            value: value.length > 0 ? value[0].Result : '----'
        })
    }
    res.send(reportData)
});


let flow = null;
router.post('/group/flow', async function (req, res) {
    flow = req.body;
    fs.writeFile('flow.json', JSON.stringify(flow), function (error, data) {
        console.log('successfully written')
    });
    res.end();
});
router.get('/group/flow', async function (req, res) {
    fs.readFile('./webapi/flow.json', function (error, data) {
        console.log(error);
        res.send(JSON.parse(data.toString()));
    });

});
router.post('/exec', async function (req, res) {
    let result = await sql.query(req.body.source);
    res.send(result);
});
let groupBy2 = function (xs, key) {
    let indices = {};
    let result = [];
    for (let i in xs) {
        let qid = xs[i].ID;
        if (indices[qid] == null) {
            indices[qid] = result.length;
            result.push({key: qid, items: []});
        }
        result[indices[qid]].items.push(xs[i]);
    }
    return result;
};
var getValue = function (list, what) {
    for (var x of list)
        if (x.Parameter === what)
            return x.Value;
}
module.exports = router;


