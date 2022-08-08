
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

export const ChatSchema = new Schema(
    {
        user:{
            type: Schema.ObjectId, ref: 'User'    
        },
        message:{
            type: String, required:true
        }
    },
    { timestamps: true }
);

export const Chats = mongoose.model('Question', ChatSchema);