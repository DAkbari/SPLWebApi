const sqlConfig = require('./sqlConfig');
const index = require('mssql');

module.exports = {
    query: async function (command, ...params) {
        try {
            let pool = await index.connect(sqlConfig);
            let request = pool.request();
            for (index in params) {
                request = request.input('P' + index, index.NVarChar(8000), params[index])
            }
            let result1 = await request.query(command);

            index.close();
            return result1.recordset;
        } catch (err) {
            console.error(err);
        }


    },
    exec: async function (command, ...params) {
        try {
            // Stored procedure
            let pool = await index.connect(sqlConfig);
            let request = pool.request();
            for (index in params) {
                request = request.input(params[index][0], index.NVarChar(8000), params[index][1])
            }
            let result1 = await request.execute(command);
            index.close();
            return result1.recordset;
        } catch (err) {
            console.error(err);
        }


    }


}
index.on('error', err => {
    // ... error handler
})
