const asyncHandler = require("express-async-handler");
const  bcryptjs = require("bcryptjs");
const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();

const hashPass = (passinput) =>{
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(passinput, salt);
    return hash;
};

const addUser = asyncHandler(async (req, res ) =>{
    let hashed = hashPass(req.body.password);
    try {
        var userObj = await userModel.create({
            "user_id": "user-" + Math.floor(Math.random() * 99999),
            "name": req.body.name,
            "email": req.body.email,
            "phone_number": req.body.phno,
            "password": hashed
        });
        if(!userObj){
            res.status(403).json({ "message": "user Signup error"});
        } else {
            res.status(200).json({"message":"user Signup Successfull"})
        }
        
    } catch (error) {
        res.status(200).json(error.errors);
    }
});


const loginUser = asyncHandler(async(req,res) =>{
    var userObj = await userModel.findOne({email:req.body.email});
    if(userObj){
        let db_hashed_pass = userObj.password;
        const isMatch = bcryptjs.compareSync(req.body.password, db_hashed_pass);
        if(isMatch){
            let token = jwt.sign({"user_id": userObj.user_id},process.env.secretKey, {expiresIn: "1h"});
            res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // <- Important!
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
}); 
            res.status(200).json({"message": "Login successful", "userInfo": userObj, "Token": token});
        } else 
        res.status(401).json({"message": "Invalid password"});


    } else {
        res.status(404).json({"message": "User not found"});
    }
});
const LogOut = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({"message": "Logout successful"});
});

module.exports = {
    addUser,
    loginUser,
    LogOut
};

console.log("User Controller is Working....");