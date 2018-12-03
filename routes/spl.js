var express = require('express');
var router = express.Router();
var path = require('path');
var sql = require('../core/sql');






/* GET home page. */
router.get('/', function (req, res, next) {
    var m =
        {
            id: 1,
            title: 'پرسنلی',
            categories: [
                {
                    id: 1,
                    title: 'تعریف پرسنل',
                    groups: [
                        {
                            id: 1,
                            title: 'اطلاعات اولیه',
                            groupInfo: {type: 'form'},
                            questions: [
                                {
                                    id: 1,
                                    title: 'نام',
                                    fieldInfo: {
                                        name: 'text',
                                        style: null,
                                        mask: ''
                                    }
                                }, {
                                    id: 2,
                                    title: 'فامیل',
                                    fieldInfo: {
                                        name: 'text',
                                        style: null,
                                        mask: ''
                                    }
                                }, {
                                    id: 3,
                                    title: 'تولد',
                                    fieldInfo: {
                                        name: 'date',
                                        style: null,
                                        mask: ''
                                    }
                                }, {
                                    id: 4,
                                    title: 'محل تولد',
                                    fieldInfo: {
                                        name: 'select',
                                        style: null,
                                        source: {
                                            url: 'http://localhost/countries'
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            id: 2,
                            title: 'اطلاعات پرسنلی',
                            groupInfo: {type: 'form'},
                            questions: [
                                {
                                    id: 1,
                                    title: 'شماره پرسنلی',
                                    fieldInfo: {
                                        name: 'text',
                                        style: null,
                                        mask: ''
                                    }
                                }, {
                                    id: 2,
                                    title: 'سمت',
                                    fieldInfo: {
                                        name: 'text',
                                        style: null,
                                        mask: ''
                                    }
                                }
                            ]
                        },
                        {
                            id: 3,
                            title: 'خودرو',
                            groupInfo: {type: 'table'},
                            questions: [
                                {
                                    id: 1,
                                    title: 'نام',
                                    fieldInfo: {
                                        name: 'text',
                                        style: {
                                            "background-color": "gray"
                                        },
                                        mask: ''
                                    }
                                }, {
                                    id: 2,
                                    title: 'مدل',
                                    fieldInfo: {
                                        name: 'text',
                                        style: null,
                                        mask: ''
                                    }
                                }, {
                                    id: 3,
                                    title: 'سازنده',
                                    fieldInfo: {
                                        name: 'text',
                                        style: null,
                                        mask: ''
                                    }
                                }
                            ]
                        }

                    ]
                },
                {
                    id: 2,
                    title: 'گزارشات SPL',
                    groups: []
                }
            ]
        };

    res.send(m)
});
router.get('/menu/:id', async function (req, res, next) {
    var mn = {categories: []};

    let dbMenu = await sql.exec("SPL.Structure_sp",
        ['kind', 'DataDictionary'],
        ['userid', '5371'],
        ['menuid', req.params.id],
        ['lng', 'fa'],
        ['levelParam', 'all']);
    let dt1 = new Date();
    let dbCategories = (groupBy(dbMenu.filter(v => v.StructureType === 'C'), "ID"));
    //console.log(getValue(groups[1198],'Caption'))
    for (let dbCat in dbCategories) {
        let cat = {groups: []};
        cat.title = getValue(dbCategories[dbCat], 'Caption');

        let dbGroups = (groupBy(dbMenu.filter(v => v.StructureType === 'G' && v.CategoryID === parseInt(dbCat)), "ID"));
        for (let dbGroup in dbGroups) {
            let group = {questions: []};
            group.title = getValue(dbGroups[dbGroup], 'Caption');

            let dbQuestions = (groupBy(dbMenu.filter(v => v.StructureType === 'A' && v.CategoryID === parseInt(dbCat) && v.GroupID === parseInt(dbGroup)), "ID"));
            for (let dbQuestion in dbQuestions) {
                let question = {};
                question.title = getValue(dbQuestions[dbQuestion], 'Caption');
                question.source = getValue(dbQuestions[dbQuestion], 'SourceID');
                question.id = dbQuestion;
                question.groupId = dbGroup;
                question.categoryId = dbCat;
                question.menuId = req.params.id;

                group.questions.push(question);
            }
            cat.groups.push(group);
        }
        mn.categories.push(cat);
    }

    console.log((new Date() - dt1))
    res.send({menu : mn});
});
// router.get('/:id', async function (req, res, next) {
//     let structure = await sql.exec("SPL.Structure_sp",
//         ['kind', 'DataDictionary'],
//         ['userid', '5371'],
//         ['menuid', req.params.id],
//         ['lng', 'fa'],
//         ['levelParam', 'all']);
//     //console.dir(structure);
//
//     res.send(structure);
// });
let flow = null;
router.post('/group/flow',async function(req, res){
    flow = req.body;
    res.end();
});
router.get('/group/flow',async function(req, res){
    res.send(flow);
});

router.post('/exec',async function(req, res){
    let result = await sql.query(req.body.source);
    res.send(result);
});
var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};
var getValue = function (list, what) {
    for (var x of list)
        if (x.Parameter === what)
            return x.Value;
}
module.exports = router;


