const mongoose = require('mongoose');
const Schema = mongoose.Schema;


module.exports =  ExerciceSchema = new Schema({

    designation:{
        type: String, required:true
    },
    description:{
        type: String,
    },
    cour:{
        type: Schema.ObjectId, ref: 'Cour'
    },
    questions: [
        {
            question: {type:Schema.ObjectId, ref: 'Question'},

        }
    ],
      
    
},
    { timestamps: true }
    );

module.exports =  Exercice = mongoose.model('Exercice', ExerciceSchema);