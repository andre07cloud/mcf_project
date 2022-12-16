
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports =  QuestionSchema = new Schema(
    {
        title:{
            type: String, required:true    
        },
        point:{
            type: Number, required:true
        },
        exerciceId:{
            type: Schema.ObjectId, ref: 'Exercice'
        },
        deletedAt : {type:Date, default: null}
    },
    { timestamps: true }
);

module.exports =  Questions = mongoose.model('Question', QuestionSchema);