const mongoose = require("mongoose");


const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://namastedev:amitmadeli@namastenode.a6jqyhn.mongodb.net/devTinder");
} 

module.exports = connectDB ;
