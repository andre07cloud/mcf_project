
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports =  PublicationSchema = new Schema(
    {
        title:{
            type: String, required:true    
        },
        classMessage:{
            type: String
        },
        message:{
            type: String, required:true
        },
        deletedAt : {type:Date, default: null}
    },
    { timestamps: true }
);

module.exports =  Publications = mongoose.model('Question', PublicationSchema);