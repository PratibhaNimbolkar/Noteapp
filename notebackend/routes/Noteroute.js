const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { authenticator } = require('../middlewares/authenticator');
const { noteModel } = require('../models/Notemodel');

const noteroutor = express.Router();
noteroutor.use(authenticator);

noteroutor.get("/" , async(req,res)=>{
    let token = req.headers.authorization
    jwt.verify(token , "Pratibha" , async(err , decode)=>{
        try {
            let data = await noteModel.find({user : decode.userId})
            res.send({
              data : data,
              message : "success",
              status:1
            })
        } catch (error) {
            res.send({
                message : error.message,
                status:0
              }) 
        }
    })
    
})

noteroutor.post("/create" , async(req,res)=>{
    try {
       let note = new noteModel(req.body) ;
       await note.save();
       res.send({message : "Note Created",
       status : 1})
    } catch (error) {
        res.send({
            message : error.message,
            status : 0
        })
    }
})

noteroutor.patch("/" , async (req ,res) =>{
    let {id} = req.headers
    try {
        await noteModel.findByIdAndUpdate({_id:id} , req.body)
        res.send({message : "Note updated",
                  status : 1})
    } catch (error) {
        res.send({message : error.message,
        status : 1})
    }
})


noteroutor.delete("/" , async (req ,res) =>{
    let {id} = req.headers
    try {
        await noteModel.findByIdAndDelete({_id:id})
        res.send({message : "Note Deleted",
                  status : 1})
    } catch (error) {
        res.send({message : error.message,
        status : 1})
    }
})
module.exports = {
    noteroutor
}