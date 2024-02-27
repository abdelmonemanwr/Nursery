const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose  = require("mongoose");

const authenticationMiddleware = require("./Middleware/Auth/authenticationMiddleware");
const authenticationRouter = require("./Route/authenticationRoute");
const teacherRouter = require("./Route/teacherRoute");
const childRouter = require("./Route/childRoute");
const classRouter = require("./Route/classRoute");

const server = express();

server.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/Nursery")
    .then(()=>{
        console.log("Connected to Nursery DBs ... ");
        server.listen(process.env.PORT || 8080, ()=>{
            console.log("  I'm listening on port 8080"); 
        });
    })
    .catch((error) => {
        console.log(error + " DB problem occured ..");
    });

// 1- logging middleware layer
server.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
// GET /endpoint 200 123bytes - 3.456 ms

server.use(express.json());
//server.use(express.urlencoded);    //data from froms

server.use(authenticationRouter);     // 2- authentication layer   logging
server.use(authenticationMiddleware); //                           authorize role
server.use(teacherRouter);            // 3- teacherRoute layer
server.use(childRouter);              // 4- childRoute layer
server.use(classRouter);              // 5- classRoute layer

// 6- Not-Found Middleware Layer
server.use((req, res, next)=>{
    console.log('  6th middleware layer: Not Found Layer');
    res.status(404).json({data:'Not Found'});
});

//7- Errors Middleware Layer
server.use((error, req, res, next)=>{
    console.log('  7th middleware: Error Handling Layer');
    res.status(error.status || 500).json({data: "Error: " + error.message});
});