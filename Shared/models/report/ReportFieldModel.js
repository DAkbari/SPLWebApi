module.exports = class ReportFieldModel {
    constructor() {
        this.title = '';
        this.value = '';
        this.row = 0;
        this.columnSpacing = 0;
    }

    getColMdSpace() {
        console.log(this.columnSpacing)
        return "col-" + Math.floor(this.columnSpacing * 12 / 20).toString();
    }

    deserialize(inp) {
        this.title = inp.title;
        this.value = inp.value;
        this.row = parseInt(inp.row);
        this.columnSpacing = parseInt(inp.columnSpacing) === 0 ? 20 : parseInt(inp.columnSpacing);
        return this;
    }
}