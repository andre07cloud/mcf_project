
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
    {
        student:{
            type: Schema.ObjectId, ref: 'User', required:true    
        },
        teacher:{
            type: Schema.ObjectId, ref: 'User', required:true    
        },
        message:{
            type: String, required:true
        },
        senderId: {
            type: String, required:true
        },
        deletedAt : {type:Date, default: null}
    },
    { timestamps: true }
);

module.exports = mongoose.model('Chat', ChatSchema);