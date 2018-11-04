const sqlConfig = require('./sqlConfig');
const sql = require('mssql');

module.exports = {
    query: async function (command, ...params) {
        try {
            let pool = await sql.connect(sqlConfig);
            let request = pool.request();
            for (index in params) {
                request = request.input('P' + index, sql.NVarChar(8000), params[index])
            }
            let result1 = await request.query(command);

            sql.close();
            return result1.recordset;
        } catch (err) {
            console.error(err);
        }


    },
    exec: async function (command, ...params) {
        try {
            // Stored procedure
            let pool = await sql.connect(sqlConfig);
            let request = pool.request();
            for (index in params) {
                request = request.input(params[index][0], sql.NVarChar(8000), params[index][1])
            }
            let result1 = await request.execute(command);
            sql.close();
            return result1.recordset;
        } catch (err) {
            console.error(err);
        }


    }


}
sql.on('error', err => {
    // ... error handler
})
