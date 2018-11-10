const sqlConfig = require('./sqlConfig');
const mssql = require('mssql');

module.exports = {
    query: async function (command, ...params) {
        try {
            let pool = await mssql.connect(sqlConfig);
            let request = pool.request();
            for (let index in params) {
                request = request.input('P' + index, mssql.NVarChar(8000), params[index])
            }
            let result1 = await request.query(command);

            mssql.close();
            return result1.recordset;
        } catch (err) {
            console.error(err);
        }


    },
    exec: async function (command, ...params) {
        try {
            // Stored procedure
            let pool = await mssql.connect(sqlConfig);
            let request = pool.request();
            for (let index in params) {
                request = request.input(params[index][0], mssql.NVarChar(8000), params[index][1])
            }
            let result1 = await request.execute(command);
            mssql.close();
            return result1.recordset;
        } catch (err) {
            console.error(err);
        }


    }


}
mssql.on('error', err => {
    // ... error handler
})
