const express = require("express");
const bcrypt = require('bcrypt');
const { PostModel } = require("../models/post.model");

const postRouter = express.Router();

postRouter.get("/" , async (req,res) => {
    if(req.query.device){
        try {
            const posts = await PostModel.find(req.query);
            res.send(posts);
        } catch (error) {
            res.send({error});
        }
    }else if(req.query.device1 && req.query.device2){
        // const {device1 , device2} = req.query;
        console.log("in the second if");
        try {
            // const posts = await PostModel.find({$and : [{device : device1},{device : device2}]});
            const posts1 = await PostModel.find({device : req.query.device1});
            const posts2 = await PostModel.find({device : req.query.device2});
            
            res.send([...posts1,...posts2]);
        } catch (error) {
            res.send({error});
        }
    }else{
        try {
            const posts = await PostModel.find();
            res.send(posts);
        } catch (error) {
            res.send({error});
        }
    }
});

postRouter.post("/create" , async (req,res) => {
    try {
        const newPost = new PostModel(req.body);
        await newPost.save();
        res.send("added the post successfully...");
    } catch (error) {
        res.send({error});
    }
});

postRouter.patch("/update/:id" , async (req,res) => {
    const ID = req.params.id;
    // console.log("this is new obj" , newObj);
    try {
        await PostModel.findByIdAndUpdate({_id:ID},req.body);
        res.send("updated successfully...");
    } catch (error) {
        res.send({error});
    }
});

postRouter.delete("/delete/:id" , async (req,res) => {
    const ID = req.params.id;
    // console.log("this is new obj" , newObj);
    try {
        await PostModel.findByIdAndDelete({_id:ID});
        res.send("deleted successfully...");
    } catch (error) {
        res.send({error});
    }
});


 

module.exports = {
    postRouter
}