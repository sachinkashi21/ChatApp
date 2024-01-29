const express=require('express');

const router=express.Router();
const {asyncWrap,isLoggedIn}=require("../helper");
const Chat=require("../models/chats");
const User=require("../models/user");

const passport=require("passport");

router.route("/signUp")
.get((req,res)=>{
    res.render("signUp.ejs");
})
.post(async(req,res,next)=>{
    let {username,email,password}=req.body;

    let user=new User({
        username,email
    });
    let regisUser=await User.register(user,password);

    res.redirect("/login");
})

router.route("/login")
.get((req,res)=>{
    res.render("login.ejs");
})
.post(passport.authenticate("local",{
    failureRedirect:"/login",
    }), 
    (req,res)=>{
    res.redirect("/users");
})

router.route("/logout")
.get((req,res)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        res.redirect("/login");
    })
})

router.route("/users")
.get(isLoggedIn,asyncWrap(async (req,res)=>{
    let allUsers=await User.find({});
    allUsers=allUsers.filter((user)=>{return !(user.id===res.locals.currUser.id)});
    res.render("users.ejs",{allUsers});
}))

module.exports= router;