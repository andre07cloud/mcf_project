
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports =  QuestionSchema = new Schema(
    {
        designation:{
            type: String, required:true    
        },
        point:{
            type: Number, required:true
        },
        exerciceId:{
            type: Schema.ObjectId, ref: 'Exercice'
        },
    },
    { timestamps: true }
);

module.exports =  Questions = mongoose.model('Question', QuestionSchema);