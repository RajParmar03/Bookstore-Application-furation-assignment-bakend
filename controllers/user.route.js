const express = require("express");
const UserModel = require("../models/user.model");

const userRouter = express.Router();

userRouter.patch("/addtocart" , (req , res) => {
    
});


module.exports = userRouter;
