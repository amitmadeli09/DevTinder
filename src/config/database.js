const mongoose = require("mongoose");


const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://namastedev:nodejs@namastenode.tzfpw4g.mongodb.net/devTinder");
} 

module.exports = connectDB ;
