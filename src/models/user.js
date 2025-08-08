const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//performing schema level checks to avoid pollution

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 4,
        maxLength : 20
    },
    lastName : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 20
    },
    age : {
        type : Number,
        min : 18,
        max : 120
    },
    emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
        if (!validator.isEmail(value)) {
            throw new Error("Invalid Email Address: " + value);
            }
        }
    },
    password : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password must be Strong"+value);
            }
        }
        
    },
    gender : {
        type : String,
        require : true,
        validate(value){   //customer vaidation fucntion
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender is Invalid");
            }
        }
    },
    bio : {
        type : String,
        default : "This is a default Bio for the user"
    },
    photoURL : {
        type : String,
        default : "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("URL is Invalid"+value)
            }
        }
    },
    skill : {
        type : [String]
    }
},{timestamps : true})


userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id:user.id},"Dev@Tinder$1234",{expiresIn:"7d"});

    return token;
}

userSchema.methods.validatePassword = async function(userInputPassword){
    const isPasswordValid =  await bcrypt.compare(userInputPassword,this.password);

    return isPasswordValid;
}

const User = mongoose.model("User",userSchema);
module.exports = User;