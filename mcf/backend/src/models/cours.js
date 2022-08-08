
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports =  CourSchema = new Schema(
    {
        designation:{
            type: String, required:true    
        },
        fichiers:{
            type: String
        },
        formation:{
            type: Schema.ObjectId, ref: 'Formation'
        },
        exercices: [
            {
                exercice: {type:Schema.ObjectId, ref: 'Exercice'},
    
            }
        ],
    },
    { timestamps: true }
);

module.exports =  Cours = mongoose.model('Cour', CourSchema);