const mongoose = require('mongoose');
const Schema = mongoose.Schema;


module.exports =  FormationSchema = new Schema({

    title:{
        type: String, required:true
    },
    description:{
        type: String,
    },
    niveau:{
        type: String
    },
    image: {
        type: String,
        required: true,
        default: "/data/uploads/mcf.png"
    },
    scormId: {
        type: String,
        default: ""
   },
    teacher: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    assignments: {
        type: [
          {
            userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: false },
            beginDate: { type: Date, default: Date.now },
          },
        ],
      },
    sections: {
        type: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Section' }],
        required: false,
        default: [],
      },
    validated:{
        type:Boolean, default:false
    },
    category: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category', required: true},
    deletedAt : {type:Date, default: null},
    countModules: {type: Number, required: true, default:0},
    countSections: {type: Number, required: true, default:0},
    duration: {type:Date}
},
    { timestamps: true }
    );

module.exports =  mongoose.model('Formation', FormationSchema);
