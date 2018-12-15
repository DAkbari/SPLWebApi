const sqlConfig = require('./sqlConfig');
const mssql = require('mssql');

module.exports = {
    query: async function (command, ...params) {

            const pool = new mssql.ConnectionPool(sqlConfig);
            pool.on('erro', err=>{console.error('sql error', err)});
            try{
                await pool.connect();
                let request = pool.request();
                for (let index in params) {
                    request = request.input('P' + index, mssql.NVarChar(8000), params[index])
                }
                let result1 = await request.query(command);
                //res.send(JSON.parse(result1.recordset[0].Structure));
                return result1.recordsets;
            }
            catch (e) {
                console.error('sql error' + e)
            }
            finally {
                pool.close();

            }
        }
    ,
    exec: async function (command, ...params) {
            // Stored procedure
            const pool = new mssql.ConnectionPool(sqlConfig);
            pool.on('erro', err=>{console.error('sql error', err)});

            try{
                await pool.connect();
                let request = pool.request();
                for (let index in params) {
                    request = request.input(params[index][0], mssql.NVarChar(8000), params[index][1])
                }
                let result1 = await request.execute(command);
                //res.send(JSON.parse(result1.recordset[0].Structure));
                return result1.recordsets;
            }
            catch (e) {
                console.error('sql error' + e)
            }


        finally {
            pool.close();

        }

    }


}
mssql.on('error', err => {
    // ... error handler
})
