const mongoose=require("mongoose");
const {Schema}=mongoose;

const chatSchema= new mongoose.Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    to: {
        type:Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        maxLen: 30,
    },
    date: {
        type: Date,
        default: Date.now(),
    }
});

const Chat= mongoose.model("Chat",chatSchema);

module.exports = Chat;