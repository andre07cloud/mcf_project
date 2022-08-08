const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SectionSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        modules: {
          type: [{ type: Schema.ObjectId, ref: 'Module' }],
          required: false,
          default: [],
        },
        formation:{
          type: Schema.ObjectId, ref: 'Formation'
        }
    },
    { timestamps: true }
);

module.exports= mongoose.model('Section', SectionSchema);