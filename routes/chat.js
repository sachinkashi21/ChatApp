const express=require('express');
const router=express.Router();
const {asyncWrap,isLoggedIn}=require("../helper");
const Chat=require("../models/chats");
const User=require("../models/user");

router.route("/:id")
.get( isLoggedIn, asyncWrap(async (req,res,next)=>{
    let {id}=req.params;
    let chats= await Chat.find( {$and:[ {$or:[ {to:id}, {from:id} ]}, {$or:[ {to:res.locals.currUser.id}, {from:res.locals.currUser.id} ]} ]} ).populate("to").populate("from");
    let toUser=await User.findById(id);
    res.render("chats.ejs",{chats,toUser});
}))
.post(isLoggedIn, asyncWrap(async (req,res,next)=>{
    let {id}=req.params;
    let {Msg}=req.body;
    newChat={content:Msg, to:id, from:req.user._id, date: new Date()};
    let response=await Chat.insertMany([newChat]);
    res.send(response);
}))
.put(isLoggedIn,asyncWrap(async (req,res)=>{
    let {id}=req.params;
    let {content:cnt}=req.body;
    Chat.findByIdAndUpdate(id,{content: cnt},{runValidators:true, new:true})
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    })
    res.redirect("/chats");
}))

module.exports=router;