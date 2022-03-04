const dbConn = require("./sql_config")
const sql = require("mssql")

async function getStudents(){
    let dbc = await sql.connect(dbConn)
    let query = await dbc.request().query("select id, first_name, middle_name, last_name, date_of_birth, gender from student").then(
        (resp) => {
            console.info('fetch successful')
            console.info(resp.recordsets[0])
        }
    ).catch(
        err => console.error(err)
    )
}

async function getStudentById(search_id){
    sql.connect(dbConn)
    .then(
        sql => {
            sql
            .request()
            .query(`SELECT id, first_name, middle_name, last_name, date_of_birth, gender from student WHERE id=${search_id}`)
            .then(
                resp => {
                    // query successful
                    console.info(resp.recordsets[0])

                }
            )
            .catch(
                err => console.error("Query not execute \n" + err)
            )
        }
    )
    .catch(
        err => {
            console.error('Connection NOT Established \n' + err)
        }
    )
}

async function deleteStudentByID(student_id){
    // var result = getStudentById(student_id).then(res => {
    //     console.log(res)
    //     console.log("Result found")}).catch(err => console.log(err))
   // console.log(result)
    sql.connect(dbConn)
    .then(
        sql => {
            sql
            .request()
            .query(`Delete from student where id=${student_id}`)
            .then(
                resp => {
                    // query successful
                    console.info(resp.recordsets[0])

                }
            )
            .catch(
                err => console.error("Query not execute \n" + err)
            )
        }
    )
    .catch(
        err => {
            console.error('Connection NOT Established \n' + err)
        }
    )
}

//insertStudent
async function insertStudent(...params){
    sql.connect(dbConn)
    .then(
        sql => {
            sql
            .request()
            .query(`Insert into student ([first_name]
                ,[middle_name]
                ,[last_name]
                ,[date_of_birth]
                ,[gender], [date_created]
                ,[date_modified]
                ,[is_deleted]) values ('${params[0]}','${params[1]}','${params[2]}',
                 PARSE('${params[3]}' as date using 'en'),'${params[4]}',GETDATE(), GETDATE(), 0)`)
            .then(
                resp => {
                    // query successful
                    console.info(resp.recordsets[0])

                }
            )
            .catch(
                err => console.error("Query not execute \n" + err)
            )
        }
    )
    .catch(
        err => {
            console.error('Connection NOT Established \n' + err)
        }
    )
}

async function updateStudent(...params){
    sql.connect(dbConn)
    .then(
        sql => {
            sql
            .request()
            .query(`Update student Set [first_name] = '${params[1]}',[middle_name] = '${params[2]}'
            ,[last_name] = '${params[3]}'
            ,[date_of_birth] = PARSE('${params[4]}' as date using 'en')
            ,[gender] = '${params[5]}' where [id] = ${params[0]}`)
            .then(
                resp => {
                    // query successful
                    console.info(resp.recordsets[0])

                }
            )
            .catch(
                err => console.error("Query not execute \n" + err)
            )
        }
    )
    .catch(
        err => {
            console.error('Connection NOT Established \n' + err)
        }
    )
}
// student
// read students    all , by id
// delete students  all,  by id
// insert students  by 1 row
// update students  by 1 row

//getStudents()           // fetch list of all students
//pass ID to get the result
//getStudentById(1)       // fetch the student whose id is 1

deleteStudentByID(17);
//deleteStudentByID(16);
//Pass parameter as first_name, middle_name, last_name, date_of_birth, gender
//insertStudent('Kim','','Pantor','01/01/2020', 'M')

//pass student ID, and other parameter to update
//updateStudent(2,'Neearj','','Patel','01/01/1998',"M")

/**
 * Tables -> student, grade, course, student grade
 * 
 * app.get(/student)
 * app.put() 
 * app.delete 
 * app.put(update)
 * 
 * SELECT 
 * Student 
 * getStudents --> all students
 * getStudentById --> from id
 * getStudentsByName --> from first / middle / last name search
 * 
 * course
 * getCourse --> all courses
 * getCourseById --> by course id
 * getCourseByName --> from name search
 * 
 * grade
 * getGrade --> all grades
 * getGradeById --> from id
 * getGradeByName --> from grade letter
 * 
 * student report
 * getStudentReportById --> generate report for a student by id
 * 
 * INSERT --> one row at a time simple insert query
 * Student 
 * insertStudent (values)
 * 
 * course
 * insertCourse (values)
 * 
 * grade
 * insertGrade (values) 
 * 
 * student report
 * insertStudentCourseGrade (sid,cid, gid)
 * 
 * UPDATE -- one row at a time
 * student
 * updateStudentById () update table set new values where columnId = queryId
 * grade
 * course
 * student grade
 * 
 */