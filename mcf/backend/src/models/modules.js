const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moduleTypes = require('../configs/configModules');

const ModuleSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
          },
        description: {
            type: String,
            default: '',
          },
        section: {type:Schema.ObjectId, ref: 'Section'},
        typeModule: {
            type: String,
            enum : [
                moduleTypes.VIDEO,
                moduleTypes.QUIZ,
                moduleTypes.PDF,
                moduleTypes.DOCUMENT,
                moduleTypes.ARTICLE,
            ],
            required: true
        },
        quizContent: {
            type: {
              quizTitle: { type: String },
              quizSynopsis: { type: String },
              nrOfQuestions: { type: String },
              questions: [
                {
                  question: { type: String },
                  questionType: { type: String },
                  questionPic: { type: String },
                  answerSelectionType: { type: String },
                  answers: { type: [String] },
                  correctAnswer: { type: Array },
                  messageForCorrectAnswer: { type: String },
                  messageForIncorrectAnswer: { type: String },
                  explanation: { type: String },
                  point: { type: Number },
                },
              ],
            },
            required: false,
        },

    },
    { timestamps: true }
);

module.exports= mongoose.model('Module', ModuleSchema);