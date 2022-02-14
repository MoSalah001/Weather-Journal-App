const express = require('express');
const server = express();
const cors = require('cors');
const bp = require('body-parser');

const port = 5000;

projectData ={
    
}

server.use(cors());
server.use(bp.urlencoded({ extended: false }));
server.use(bp.json());
server.listen(port,startServer);
server.use(express.static('public'));

function startServer(){
    console.log(`server is running on port:${port}`);
}

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
