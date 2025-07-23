const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

//API level 
//sending to the database
app.post("/signup",(req,res) => {
    const user = new User({
        firstName: "Anwesha",
        lastName: "Mahapatra",
        age:24,
        emailId:"anwesha@gmail.com",
        password:"anwesha@123",
        gender:"female"
    });

    try{
        user.save();
        res.send("User Saved Succesfully");
    }
    catch(err){
        res.status(500).send("Something Went Wrong !")
    }
})

//get the details of an user
app.get("/user",async (req,res) => {
    const userId = req.body._id;
    const user = await User.findById("688110bef0fce5f9be660a35");
    res.send(user);
    console.log(user);
})

//delete the user
app.delete("/user",async (req,res)=>{
    const userId = req.body._id;
    try{
        const user = await User.findByIdAndDelete(userId);
        if(!user){
            res.status(500).send("Something Went Wrong !");
        }else{
            res.send("User Deleted Successfully");
            console.log(user);
        }
    }catch(err){
        res.status(404).send("User Not Found");
    }
})


//editing the database
app.patch("/user",async(req,res)=>{
    const userId = req.body._id;
    try{
        const user = await User.findByIdAndUpdate(userId,{emailId: "amitmadeli09@gmail.com",age: 24});
        if(!user){
            res.status(500).send("Something went wrong !");
        }else{
            res.send("User Updated Successfully");
            console.log(user);
        }
    }catch(err){
        res.status(404).send("User Not Found");
    }
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
