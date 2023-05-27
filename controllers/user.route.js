const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

const UserModel = require("../models/user.model");


const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const users = await UserModel.find({ username: username });
        if (users.length > 0) {
            res.status(400).send({ msg: "user already exist.", isSuccess: false });
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                // Store hash in your password DB.
                if (err) {
                    console.log(err);
                    res.status(500).send({ msg: "failed in signup", isSuccess: false });
                } else {
                    let newUser = new UserModel({ username, email, password: hash });
                    await newUser.save();
                    res.status(200).send({ msg: "success in signup", isSuccess: true });
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "failed in signup", isSuccess: false });
    }
});

userRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const [user] = await UserModel.find({ username: username });
        bcrypt.compare(password, user.password, (err, result) => {
            // result == false
            if (!result) {
                console.log(err);
                res.status(500).send({ msg: "failed in login", isSuccess: false, token: "", user: {} });
            } else {
                const token = jwt.sign({ username: user.username }, 'rajparmar');
                res.status(200).send({ msg: "success in login", isSuccess: true, token: token, user: user });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "failed in login", isSuccess: false, token: "", user: {} });
    }
})

userRouter.patch("/addtocart", async (req, res) => {
    const {_id} = req.body;
    const token = req.headers.authorization;
    try {
        const {username} = jwt.verify(token, 'rajparmar');
        const [user] = await UserModel.find({username : username});
        const checkingArray = user.cart.filter((elem) => {
            return elem._id === _id;
        });
        if(checkingArray.length === 0){
            const newCart = [...user.cart , req.body];
            await UserModel.findByIdAndUpdate({_id : user.id} , {cart : newCart});
            res.status(200).send({msg : "successfully added to cart." , isSuccess : true});
        }else{
            res.status(400).send({msg : "this book is already in your cart." , isSuccess : false});
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({msg : "failed in added to cart." , isSuccess : false});
    }
});

userRouter.patch("/removefromcart", async (req, res) => {
    const {_id} = req.body;
    const token = req.headers.authorization;
    try {
        const {username} = jwt.verify(token, 'rajparmar');
        const [user] = await UserModel.find({username : username});
        const newCart = user.cart.filter((elem) => {
            return elem._id !== _id;
        });
        await UserModel.findByIdAndUpdate({_id : user.id} , {cart : newCart});
        res.status(200).send({msg : "successfully removed from cart." , isSuccess : true});
    } catch (error) {
        console.log(error);
        res.status(400).send({msg : "failed in remove from cart." , isSuccess : false});
    }
});

userRouter.patch("/clearcart", async (req, res) => {
    const token = req.headers.authorization;
    try {
        const {username} = jwt.verify(token, 'rajparmar');
        const [user] = await UserModel.find({username : username});
        await UserModel.findByIdAndUpdate({_id : user.id} , {cart : []});
        res.status(200).send({msg : "successfully clear the cart." , isSuccess : true});
    } catch (error) {
        console.log(error);
        res.status(400).send({msg : "failed in clearing the cart." , isSuccess : false});
    }
});


userRouter.get("/getuser" , async(req , res) => {
    const token = req.headers.authorization;
    try {
        const {username} = jwt.verify(token, 'rajparmar');
        const [user] = await UserModel.find({username : username});
        res.status(200).send({msg : "successfully get user" , isSuccess : true , user : user});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg : "failed in get user." , isSuccess : false , user : {}});
    }
})


module.exports = userRouter;
