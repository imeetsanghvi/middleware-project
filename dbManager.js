const dbConn = require("./sql_config")
const sql = require("mssql")



module.exports = {
    getTable: getTable,
    insertRecord: insertRecord
}