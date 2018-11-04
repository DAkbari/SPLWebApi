var sqlConfig = require('../sql/sqlConfig');
const sql = require('mssql');

module.exports.execSQL =
    async function (command) {
        try {
            let pool = await sql.connect(sqlConfig.config);
            // let result1 = await pool.request()
            //     .input('input_parameter', sql.Int, value)
            //     .query('select * from mytable where id = @input_parameter');

            let result1 = await pool.request()
                .query(command);

            return result1;
            // Stored procedure

            // let result2 = await pool.request()
            //     .input('input_parameter', sql.Int, value)
            //     .output('output_parameter', sql.VarChar(50))
            //     .execute('procedure_name')

            // console.dir(result2)
        } catch (err) {
            // ... error checks
        }


    sql.on('error', err => {
        // ... error handler
    })
}
