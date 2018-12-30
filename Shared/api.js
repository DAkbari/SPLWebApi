let ReportModel  = require("./models/report/ReportModel")

const axios = require('axios');

module.exports = {
    report: async function (reportId, fkId) {
        let data = (await axios.get('http://localhost:3000/api/v1/spl/report/' + reportId + '/' + fkId)).data;
        let repModel = new ReportModel().deserialize(data[0]);
        console.log(repModel);
        return repModel;
    }
}