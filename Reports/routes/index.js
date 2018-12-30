var api = require('../../Shared/api');
var express = require('express');
var router = express.Router();
var path = require('path')
let Stimulsoft = require('stimulsoft-reports-js')
/* GET home page. */
router.get('/', async function (req, res, next) {
    let report = await api.report(835, 502412);
    res.render('index/index', {model: report});
});
router.get('/index2', async function (req, res, next) {

    var report = new Stimulsoft.Report.StiReport();
    var page = report.pages.getByIndex(0);

    //Create HeaderBand
    var headerBand = new Stimulsoft.Report.Components.StiHeaderBand();
    headerBand.height = 0.5;
    headerBand.name = "HeaderBand";
    page.components.add(headerBand);

    //Create Databand
    var dataBand = new Stimulsoft.Report.Components.StiDataBand();
    dataBand.height = 0.5;
    dataBand.name = "DataBand";
    page.components.add(dataBand);
    var t = new Stimulsoft.Report.Components.StiText();
    t.clientRectangle = new Stimulsoft.System.Drawing.Rectangle(0, 0, page.width, 0.5);
    t.text = "Count - {Count()}";
    t.horAlignment = Stimulsoft.Base.Drawing.StiTextHorAlignment.Right;
    t.name = "FooterText";
    t.brush = new Stimulsoft.Base.Drawing.StiSolidBrush(Stimulsoft.System.Drawing.Color.lightGreen);
    dataBand.components.add(t);



    var footerBand = new Stimulsoft.Report.Components.StiFooterBand();
    footerBand.height = 0.5;
    footerBand.name = "FooterBand";
    page.components.add(footerBand);

    //Create text on footer
    var footerText = new Stimulsoft.Report.Components.StiText();
    footerText.clientRectangle = new Stimulsoft.System.Drawing.Rectangle(0, 0, page.width, 0.5);
    footerText.text = "Count - {Count()}";
    footerText.horAlignment = Stimulsoft.Base.Drawing.StiTextHorAlignment.Right;
    footerText.name = "FooterText";
    footerText.brush = new Stimulsoft.Base.Drawing.StiSolidBrush(Stimulsoft.System.Drawing.Color.lightGreen);
    footerBand.components.add(footerText);
    //let report = await api.report(835, 502412);
    let jsonReport = report.saveToJsonString()
    res.render('index/index2.ejs',{report : jsonReport});
});
module.exports = router;


