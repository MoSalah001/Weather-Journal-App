const express = require('express');
const server = express();
const cors = require('cors');
const bp = require('body-parser');

let port = process.env.PORT || 5000;
let host = process.env.HOST || '0.0.0.0';

projectData ={
    
}

server.use(cors());
server.use(bp.urlencoded({ extended: false }));
server.use(bp.json());
server.listen(port,host,startServer);
server.use(express.static('public'));

function startServer(){
    console.log("listening on port %d",port,host);
}

server.get('/',(req,res)=>{
    res.sendFile('./public/index.html')
})

server.get('/getData',(req,res)=>{
    res.send(projectData);
})

server.post('/postApiData',(req,res)=>{
    projectData.temp = req.body.temp
    projectData.date = req.body.date
    projectData.feel = req.body.feel
    res.send(projectData)
})

server.post('/addData',(req,res)=>{
    projectData = req.body;
    res.send()
})
