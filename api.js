const express = require("express");
const { append } = require("express/lib/response");
const dbManager = require("./dbManager");
const bodyParser = require('body-parser')
const PORT = 300
const app = express()
app.use(bodyParser.urlencoded({
    extended:true
}))

app.listen(PORT, ()=> console.info('listening to port ' + PORT))

app.get('/', (req, res) => {
    res.send('hello')
})

app.get('/students', (req, res) => {
    dbManager.getStudents()
    .then(
        result => {
            console.dir(result)
            res.json(result)
        }
    )
    .catch( err => res.send(`fetch error ${err}`))
})


app.get('/getStudentById/:id', (req, res) => {
    dbManager.getStudentById(req.params.id)
    .then(
        result => {
            console.dir(result)
            res.json(result)
        }
    )
    .catch( err => res.send(`fetch error ${err}`))
})


app.delete('/deleteStudentById/:id', (req, res) => {
    let student_id = req.params.id
    if (student_id.length === 0){
        res.sendStatus(400).send("Student id Required")
    }
    else{
        dbManager.deleteStudentById(student_id)
        .then(
            result => {
                console.dir(result)
                res.json({'success':'delete successful'})
            }
        )
        .catch( err => res.send(`delete error ${err}`))
    }
})

app.post('/insertStudent', (req, res) => {

    const form_data = req.body
    const first_name = form_data.first_name
    const middle_name = form_data.middle_name
    const last_name = form_data.last_name
    const date_of_birth = form_data.date_of_birth
    const gender = form_data.gender 

    dbManager.insertStudent(first_name, middle_name, last_name, date_of_birth, gender)
    .then(
        result => {
            console.dir(result)
            res.json({'success':result||'insert successful'})
        }
    )
    .catch( err => res.send(`insert error === ${err}`))

})

app.put('/updateStudent', (req, res) => {

    const form_data = req.body
    const student_id = form_data.id
    const first_name = form_data.first_name
    const middle_name = form_data.middle_name
    const last_name = form_data.last_name
    const date_of_birth = form_data.date_of_birth
    const gender = form_data.gender 
    console.log(form_data)
    dbManager.updateStudentById(student_id, first_name, middle_name, last_name, date_of_birth, gender)
    .then(
        result => {
            console.dir(result)
            res.json({'success':result||'update successful'})
        }
    )
    .catch( err => res.send(`update error === ${err}`))
})

// dbManager.getStudents()

// dbManager.getStudentById()        // will throw error as student id is required 
// dbManager.getStudentById(2)       // fetch the student whose id is 1

// dbManager.deleteStudentById(1002); // delete student entry by student id 
// dbManager.deleteStudentById()      // will throw error as student id is required 

// Pass parameter as first_name, middle_name, last_name, date_of_birth, gender
// dbManager.insertStudent('Kim','','Kardashian','01/01/2020', 'f')

// pass student ID, and other parameter to update
// dbManager.updateStudentById(2,'Neearj','','Patel','01/03/1997',"M")