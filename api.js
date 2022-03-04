const db = require("./dbManager")
// const prod = require("./product")


// db.getProducts().then(
//     result=>{
//         console.log(result)
//     }
// )

db.getTable('student').then(
    res => console.log(res)
)



/**
 * tables ==> student, grade, course, student_grade
 * 
 * 
 */