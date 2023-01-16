const express = require("express");
const bcrypt = require('bcrypt');
const { UserModel } = require("../models/user.model");

const userRouter = express.Router();

userRouter.get("/" , (req,res) => {
    try {
        
        res.send("welcome to the user home page..");
    } catch (error) {
        res.send({error});
    }
})

userRouter.post("/register", async (req,res) => {
    const {name,email,gender,password} = req.body;
    try {
        bcrypt.hash(password, 5 , async (err, hash) => {
            // Store hash in your password DB.
            if(err){
                console.log(err);
                res.send({err});
            }
            const newUser = new UserModel({name,email,gender,password : hash});
            await newUser.save();
            res.send("added the user successfully");
        });
    } catch (error) {
        res.send({error});
    }
});

userRouter.post("/login", async (req,res) => {
    const {email,password} = req.body;
    try {
        const users = await UserModel.find({email});
        if(users.length > 0){
            bcrypt.compare(password, users[0].password,(err, result) => {
                if(result){
                    res.send("successfully logged in..");
                }else{
                    res.send("wrong credentials..");
                }
            });
        }else{
            res.send("wrong credentials..");
        }
    } catch (error) {
        res.send({error});
    }
});

module.exports = {
    userRouter
}