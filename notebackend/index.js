const express = require('express');
const cors = require("cors")
const {userRouter} = require("./routes/Userroutes")
const { connection } = require('./db');
const { noteroutor } = require('./routes/Noteroute');
require("dotenv").config();
const port = process.env.PORT
const app = express();
app.use(express.json())
app.use(cors())
app.use("/user" , userRouter)
app.use("/note" , noteroutor)
app.get('/' , (req , res)=>{
    res.send("APi is working now")
})

app.listen(port , async()=>{
    try{
        await connection
        console.log('Database is Connected')
    }
    catch(error){
        console.log(error)
    }
    console.log("Server is running on port" ,port)
})