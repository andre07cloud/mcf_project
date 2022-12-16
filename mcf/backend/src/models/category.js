
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
        title:{type: String, required:true},
        image: {
            type: String,
            required: true,
            default: "/data/uploads/mcf.png"
        },
        formations:{
            type:[{type: mongoose.SchemaTypes.ObjectId, ref:'Formation'}], 
            default: [] 
        },
        deletedAt : {type:Date, default: null}
    },
    { timestamps: true }
);

module.exports = mongoose.model('Category', CategorySchema);