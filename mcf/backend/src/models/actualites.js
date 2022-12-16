const mongoose = require("mongoose");
const Schema = mongoose.Schema;

export const ActualiteSchema = new Schema(
    {
        title: {type:String, required: true},
        description:{type: String},
        link:{type: String},
        image:{type: String},
        deletedAt : {type:Date, default: null}
    },
    { timestamps: true }
);

export const Chats = mongoose.model('Actualite', ActualiteSchema);