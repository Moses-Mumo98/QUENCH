const express = require('express');
const mongoose = require ('mongoose')
require("dotenv").config();
const PORT = 2000;
const cors = require("cors");
const app = express();
const authRoutes = require ("./routes/auth")

mongoose
.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log('DB Connected');
})
.catch((error)=>{
    console.error(error);
})

app.use(cors())
 app.use(express.json())
 app.use("/api/auth", authRoutes)
app.get("/users",(req,res)=>{
    res.send("Hello")
})



app.listen(PORT, ()=>{
    console.log('Server RUNNING');
})

