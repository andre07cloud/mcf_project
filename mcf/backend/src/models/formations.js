const mongoose = require('mongoose');
const Schema = mongoose.Schema;


module.exports =  FormationSchema = new Schema({

    designation:{
        type: String, required:true
    },
    description:{
        type: String,
    },
    niveau:{
        type: String
    },
    category:{
        type: String
    },
    image: {
        type: String,
        required: true,
        default: "/data/uploads/mcf.png"
    },
    teacher: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: false,
    },
    assignments: {
        type: [
          {
            user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: false },
            beginDate: { type: Date, default: Date.now },
          },
        ],
      },
    sections:[
        {
            sectionId: {type:Schema.ObjectId, ref: 'Section'},
            required: false,
            default: [],
        }
    ],
    validated:{
        type:Boolean, default:false
    },
    
},
    { timestamps: true }
    );

module.exports =  mongoose.model('Formation', FormationSchema);