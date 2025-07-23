const express = require("express");
const connectDB = require("./config/database");
const app = express();

app.use((req,res) => {
    res.send("Hello from the server");
})

connectDB()
    .then(() =>{
    console.log("Database connection established");
    app.listen(7777,() =>{
        console.log("Server is running on PORT number 7777");
    })
}) 
    .catch((err)=>{
    console.error("Database connection failed");
})
