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
        res.send(studentData[0]);
    } else {
        res.sendStatus(404);
    }
});

app.post("/api/student",(req,res)=>{
    const id=new Date().valueOf();
    const name=req.body.name;
    const currentClass=req.body.currentClass;
    const division=req.body.division;
    //console.log(req.body.division);
    const new_id={id:`${id}`};
    if(name != undefined && currentClass!=undefined && division!=undefined){
        const newStudent={id:id,name:`${name}`,currentClass:currentClass,division:`${division}`};
        //studentArray.push(newStudent);
        studentArray=[...studentArray,newStudent];
        console.log(studentArray);
        res.send(new_id);
    }
    else{
        res.sendStatus(400);
    }
});

app.put("/api/student/:id",(req,res)=>{
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