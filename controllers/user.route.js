const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

const UserModel = require("../models/user.model");


const userRouter = express.Router();

userRouter.post("/signup" , async (req , res) => {
    const {username , email , password} = req.body;
    try {
        bcrypt.hash(password, 5, async(err, hash) => {
            // Store hash in your password DB.
            if(err){
                console.log(err);
                res.status(500).send({msg : "failed in signup" , isSuccess : false});
            }else{
                let newUser = new UserModel({username , email , password : hash});
                await newUser.save();
                res.status(200).send({msg : "success in signup" , isSuccess : true});
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({msg : "failed in signup" , isSuccess : false});
    }
});

userRouter.post("/login" , async (req , res) => {
    const {username , password} = req.body;
    try {
        const [user] = await UserModel.find({username : username});
        bcrypt.compare(password, user.password, (err, result) => {
            // result == false
            if(!result){
                console.log(err);
                res.status(500).send({msg : "failed in login" , isSuccess : false , token : "" , user : {}});
            }else{
                const token = jwt.sign({ username : user.username }, 'rajparmar');
                res.status(200).send({msg : "success in login" , isSuccess : true , token : token , user : user});
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({msg : "failed in login" , isSuccess : false , token : "" , user : {}});
    }
})

userRouter.patch("/addtocart" , (req , res) => {
    
});


module.exports = userRouter;
