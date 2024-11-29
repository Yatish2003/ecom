const express=require('express');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../../data.json');
const data = require(dataPath);
const routes=express.Router();


routes.get('/', (req, res) => {
    res.json(data.credentials);
});

routes.post('/', (req, res) => {
    const credsVal=req.body;
    console.log(credsVal);
    if(!credsVal.userName || !credsVal.userEmail || ! credsVal.userPass){
        return res.status(400).json({mess:'Enter All input fields'});
    }
    data.credentials.push(credsVal);
    fs.writeFile(dataPath,JSON.stringify(data),{ encoding: 'utf8' },(err)=>{
        if(err){
            res.status(500).json({mess:'Failed to add creds'});
        }
        res.json({message:'Creds Added Succesfully',creds:credsVal});
    })
});

module.exports = routes;