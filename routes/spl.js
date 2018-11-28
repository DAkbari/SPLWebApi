var express = require('express');
var router = express.Router();
var path = require('path');
var sql = require('../core/sql');

/* GET home page. */
router.get('/', function (req, res, next) {
    var m =
        {
            title: 'منوی افراد',
            groups: [
                {
                    title: 'اطلاعات اولیه',
                    groupInfo: {type: 'form'},
                    questions: [
                        {
                            title: 'نام',
                            fieldInfo: {
                                name: 'text',
                                style: null,
                                mask: ''
                            }
                        }, {
                            title: 'فامیل',
                            fieldInfo: {
                                name: 'text',
                                style: null,
                                mask: ''
                            }
                        }, {
                            title: 'تولد',
                            fieldInfo: {
                                name: 'date',
                                style: null,
                                mask: ''
                            }
                        }, {
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
                    title: 'اطلاعات پرسنلی',
                    groupInfo: {type: 'form'},
                    questions: [
                        {
                            title: 'شماره پرسنلی',
                            fieldInfo: {
                                name: 'text',
                                style: null,
                                mask: ''
                            }
                        }, {
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
                    title: 'خودرو',
                    groupInfo: {type: 'table'},
                    questions: [
                        {
                            title: 'نام',
                            fieldInfo: {
                                name: 'text',
                                style: {
                                    "background-color": "gray"
                                },
                                mask: ''
                            }
                        }, {
                            title: 'مدل',
                            fieldInfo: {
                                name: 'text',
                                style: null,
                                mask: ''
                            }
                        }, {
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
        };

    res.send(m)
});
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
router.get('/test', async function (req, res, next) {
    await sleep(10000);
    res.send({a:1,b:2});
});
router.get('/emp', async function (req, res, next) {
    let emps = await sql.query("select top 10 * from pub.employees ");
    res.send(emps);
});
router.get('/:id', async function (req, res, next) {
    let  structure = await sql.exec("SPL.Structure_sp",
        ['kind', 'DataDictionaryJson'],
        ['userid', '5371'],
        ['menuid', req.params.id],
        ['lng', 'fa'],
        ['levelParam', 'all']);
    //console.dir(structure);
    res.send(JSON.parse(structure[0].Structure));
});


module.exports = router;


