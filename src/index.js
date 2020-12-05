const express = require('express')
const fs = require("fs");
let studentArray = require('./InitialData.js');
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
app.get("/api/student", (req, res) => {
    res.status(201).send(studentArray);
});

app.get("/api/student/:id", (req, res) => {
    const id = req.params.id;
    const studentData = studentArray.filter((data) => data.id == id);
    if (studentData.length > 0) {
        res.status(201).send(JSON.stringify(studentData));
    } else {
        res.sendStatus(404);
    }
});

app.post("/api/student",(req,res)=>{

});

app.put("/api/student/:id",(req,res)=>{

});

app.delete("/api/student/:id",(req,res)=>{
    const id = req.params.id;
    const studentData = studentArray.filter((data) => data.id == id);
    if (studentData.length > 0) {
        const newArray=studentArray.filter((data) => data.id != id);
        //How to update in InitialData.js file
        studentArray=newArray;
        console.log(studentArray);
        res.status(201).send(JSON.stringify(newArray));
    } else {
        res.sendStatus(404);
    }
});
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   