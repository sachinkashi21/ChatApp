const mongoose=require("mongoose");
main().then((res)=>{
    console.log("connection established");
}) 
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/chatdb');
}

const Chat=require("../models/chats.js");

const manyChat = [
    {
        from: "Captain America",
        to: "Tony Stark",
        content: "I can do this all day",
        date: new Date()
    },
    {
        from: "Tony Stark",
        to: "Captain America",
        content: "Sometimes you gotta run before you can walk.",
        date: new Date()
    },
    {
        from: "Thor",
        to: "Black Widow",
        content: "We are all heroes of our own stories",
        date: new Date()
    },
    {
        from: "Black Widow",
        to: "Hulk",
        content: "Sun's getting real low",
        date: new Date()
    },
    {
        from: "Thanos",
        to: "Dr Strange",
        content: "THe Hardest choices, require Strongest wills",
        date: new Date()
    },
    {
        from: "Doctor Strange",
        to: "Spider-Man",
        content: "We're in the endgame now",
        date: new Date()
    },
    {
        from: "Spider-Man",
        to: "Tony Stark",
        content: "Mr. Stark, I don't feel so good",
        date: new Date()
    },
    {
        from: "Black Panther",
        to: "Okoye",
        content: "Wakanda forever",
        date: new Date()
    },
    {
        from: "Loki",
        to: "Nick Fury",
        content: "I am Loki, of Asgard, and I am burdened with glorious purpose",
        date: new Date()
    },
    {
        from: "Ant-Man",
        to: "Wasp",
        content: "Does anyone have any orange slices?",
        date: new Date()
    }
];

const emptyChat=[];

Chat.insertMany(emptyChat)
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    });