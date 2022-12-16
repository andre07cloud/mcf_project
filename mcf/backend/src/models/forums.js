
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ForumSchema = new Schema(
    {
        user:{
            type: Schema.ObjectId, ref: 'User', required:true   
        },
        message:{
            type: String, required:true
        },
        deletedAt : {type:Date, default: null}
    },
    { timestamps: true }
);

module.exports = mongoose.model('Forum', ForumSchema);