let ReportFieldModel = require("./ReportFieldModel");

module.exports = class ReportModel {
    constructor() {
        this.fields = [];
    }
    getRows(){
        let rows = [];
        for (let field of this.fields) {
            if(rows.indexOf(field.row) === -1)
                rows.push(field.row);
        }
        return rows;
    }
    getFieldsByRow(row){
        let fields = [];
        for (let field of this.fields) {
            if(field.row ===row)
                fields.push(field);
        }
        return fields;
    }
    deserialize(inp) {
        for (let _field of inp) {
            this.fields.push(new ReportFieldModel().deserialize(_field));
        }
        return this;
    }
    setValues(inp){
        for (let _val of inp) {
            this.fields.filter(fld=>fld.ID.toString() === _val.ID.toString())[0].value = _val.Result;
        }
    }
}