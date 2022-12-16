const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moduleTypes = require('../configs/configModules');
const { validated } = require("../controllers/formations/formationsControllers");

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
        filePath: {
            type: String,
            required: false,
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
                moduleTypes.EXERCICE,
                moduleTypes.SCORM
            ],
            required: true
        },
        quizContent: {
            type: {
              quizTitle: { type: String },
              quizSynopsis: { type: String },
              nrOfQuestions: { type: String },
              quizTotalScore: {type:String},
              questions: [
                {
                  question: { type: String },
                  questionType: { type: String },
                  questionPic: { type: String },
                  answerSelectionType: { type: String },
                  answers: { type: [String] },
                  correctAnswer: { type: [String] },
                  messageForCorrectAnswer: { type: String },
                  messageForIncorrectAnswer: { type: String },
                  explanation: { type: String },
                  point: { type: Number },
                  waitingTime: { type:Date}
                },
              ],
            },
            required: false,
        },
        deletedAt : {type:Date, default: null},
        comments:{
          type: [
            {
                validated: {type:String, default: 'pending'},
                userId: {type:Schema.ObjectId, ref:'User', required:true},
                comment: {type:String, default:''},
                date: {type: String, default:Date.now()}
            },
            
          ],
          default:[]

        }
    },
    { timestamps: true }
);

module.exports= mongoose.model('Module', ModuleSchema);