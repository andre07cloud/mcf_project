const mongoose = require('mongoose');
const Schema = mongoose.Schema;


module.exports =  UserInscritSchema = new Schema({

    user:{
        type: Schema.ObjectId, ref: 'User'
    },
    formations: [
        {
            type:Schema.Types.ObjectId, ref: 'Formation'
            //done: {type: Boolean, default: false},
            //total_score: { type: Number, min:0, max:20, default:0}
        }
    ],
    creator:{
        type: Schema.Types.ObjectId, ref: 'User'
    },
    
    
},
    { timestamps: true }
    );

module.exports =  mongoose.model('UserInscrit', UserInscritSchema);