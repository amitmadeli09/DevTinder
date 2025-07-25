const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json()); //coverting JSON objects to JavaScript Objects by express method

//API level 
//sending to the database
app.post("/signup",async (req,res) => {
    const userDetails = req.body;
    const user = new User(userDetails);

    try{
        await user.save();
        res.send("User Saved Succesfully");
    }
    catch(err){
        res.status(400).send("Unable to Save. Invalid Input from the User: "+err)
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
app.patch("/signup/:_id",async (req,res)=>{
    const userId = req.params?._id;
    const userData = req.body;
    //console.log(userData);

    try{
        const ALLOWED_UPDATES=["age","password","bio","photoURL","skill"]; // we are selecting keys
        const isUpdateAllowed = Object.keys(userData).every((key)=>
            ALLOWED_UPDATES.includes(key)
        );

        if(!isUpdateAllowed){
            throw new Error("Update Not Allowed");
        }
        if(userData?.skill.length > 5){
            throw new Error("Must have 5 Skills");
        }
        const user = await User.findByIdAndUpdate({_id:userId},userData,{returnDocument : "after",runValidators:true});
        res.send("User Details Successfully");
        console.log(user);
    }catch(err){
        res.status(400).send("UPDATE FAILED:"+err.message);
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
