const dbConn = require("./sql_config")
const sql = require("mssql")

async function getProducts(){
    console.log('connecting to sql')

    let dbContext = await sql.connect(dbConn)
    console.log('seccuessfully connected to the db')

    console.log('start sql query for products')

    let result = await dbContext.request().query(
        `SELECT [id]
            ,[first_name]
            ,[middle_name]
            ,[last_name]
            ,[date_of_birth]
            ,[gender]
        FROM [student_record].[dbo].[student]`
    );

    console.log("resturned sql results")
    return result.recordsets;
}


async function getTable(tableName){
    let columns = `*`
    switch (tableName) {
        case 'course':
            columns = `[id]
            ,[course_name]
            ,[course_number]
            ,[modality]
            ,[date_start]`
            break;
        case 'grade':
            columns = `[id]
            ,[grader_percentage_from]
            ,[grader_percentage_to]
            ,[grade_letter]`
            break;
        case 'student':
            columns = `[id]
            ,[first_name]
            ,[middle_name]
            ,[last_name]
            ,[date_of_birth]
            ,[gender]`
            break;
        case 'student_grade':
            columns = `[id]
            ,[student_id]
            ,[course_id]
            ,[grade_id]`
            break;
    
        default:
            return 'Table Name does not match' 
            break;
    }

    let db = await sql.connect(dbConn)
    let result = await db.request().query(
        `SELECT ${columns} FROM ${tableName}`
    )
    return result.recordsets



}


module.exports = {
    getProducts: getProducts,
    getTable: getTable,
}