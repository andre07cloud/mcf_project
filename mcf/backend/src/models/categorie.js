const mongoose = require('mongoose');
const Schema = mongoose.Schema;


module.exports =  CategorySchema = new Schema({

    designation:{
        type: String, required:true
    },
    description:{
        type: String,
    },
    creator:{
        type: Schema.ObjectId, ref: 'User'
    },
    formations: [
        {
            formation: {type:Schema.ObjectId, ref: 'Formation'},

        }
    ],
    
},
    { timestamps: true }
    );

module.exports =  Categorie = mongoose.model('Categorie', CategorySchema);