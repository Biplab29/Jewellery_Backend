const express = require('express');
const userRouter = express.Router();
const userController = require("../controllers/userController");

userRouter.post("/signup", userController.addUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/logout", userController.LogOut);



module.exports = userRouter ;
console.log("User Route is Working...");