const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
var app = express();

//Configuring express server
app.use(cors());
app.use(bodyparser.json());

const auth=require('./auth');
const doctor=require('./doctor')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySQLroot@123",
    database: "ASD_APP"
});

con.connect((err)=> {
    if(!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
});


app.get('/doctor',(req,res)=>auth.docAuth(req,res));
app.get('/doctor/mypatients',(req,res)=>doctor.mypatients(req,res));

app.get('/patient' , (req, res)=>auth.patAuth(req,res));
//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));