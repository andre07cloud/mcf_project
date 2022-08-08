
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports =  PublicationSchema = new Schema(
    {
        designation:{
            type: String, required:true    
        },
        classMessage:{
            type: String
        },
        message:{
            type: String, required:true
        }
    },
    { timestamps: true }
);

module.exports =  Publications = mongoose.model('Question', PublicationSchema);