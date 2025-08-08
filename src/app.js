const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const userValidateSignup = require("./util/validations");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userAuth = require("./middlewares/auth");

const app = express();

app.use(express.json()); //coverting JSON objects to JavaScript Objects by express method
app.use(cookieParser());
//API level 
//sending to the database
app.post("/signup",async (req,res) => {
    
    try{
        //1st Step : Validate the user
        userValidateSignup(req);

        const {firstName,lastName,emailId,password} = req.body;
        //2nd Step : Encrypt the password
        const passwordHash = await bcrypt.hash(password,10);
        //console.log(passwordHash);
        const user = new User({firstName,lastName,emailId,password:passwordHash});
        
        //Step 3 : Register the User
        await user.save();
        res.send("User Saved Succesfully");
    }
    catch(err){
        res.status(400).send("Unable to Save. Invalid Input from the User: "+err)
    }
});

app.post("/login",async (req,res)=>{
    try{
        const {emailId,password} = req.body;
        const user = await User.findOne({emailId : emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await user.validatePassword(password)
        if(isPasswordValid){
            //add JWT Token
            const token = await user.getJWT();
            //console.log(token);
            //Add token and send the response back 
            res.cookie("token",token),{expires : new Date(Date.now() + 8*3600000)};
            res.send("Login Successful");
        }else{
            throw new Error("Invalid Credentials");
        }

    }catch(err){
        res.status(400).send("Error: "+err.message);
    }
})

app.get("/profile",userAuth,async(req,res)=>{
    try{
        const user = req.user;
        res.send(user);
    }catch(err){
        res.status(400).send("Error:"+err.message);
    }
})

app.post("/sendConnectionRequest",userAuth,(req,res)=>{

    const user = req.user.firstName;

    console.log("Connection request sent by "+user);

    res.send(user+" sent a connection request");

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