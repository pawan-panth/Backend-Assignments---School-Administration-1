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
    res.send(studentArray);
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
    const id=new Date().valueOf();
    const name=req.body.name;
    const currentClass=req.body.currentClass;
    const division=req.body.division;
    console.log(req.body.division);
    const body={id:`${id}`};
    if(name != undefined && currentClass!=undefined && division!=undefined){
        res.send(JSON.stringify(body));
    }
    else{
        res.sendStatus(400);
    }
});

app.put("/api/student/:id",(req,res)=>{

});

app.delete("/api/student/:id",(req,res)=>{
    const id = req.params.id;
    const studentData = studentArray.filter((data) => data.id == id);
    if (studentData.length > 0) {
        const newArray=studentArray.filter((data) => data.id != id);
        //update the student array
        studentArray=newArray;
        console.log(studentArray);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   