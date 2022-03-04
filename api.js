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

// student
// read students    all , by id
// delete students  all,  by id
// insert students  by 1 row
// update students  by 1 row

getStudents()           // fetch list of all students
getStudentById(1)       // fetch the student whose id is 1
 


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