const httpStatus = require('http-status');

const fs = require('fs');
const Module = require("../../models/modules");
const moduleService = require('../../services/moduleServices');
const sectionService = require('../../services/sectionServices');
const configModule = require('../../configs/configModules'); 
//const scormService = require('../../services/scormServices');
const courseService = require('../../services/formationServices');
const categoryService = require('../../services/categoryServices');
const userService = require('../../services/userServices');
const Section = require('../../models/sections');
const Course = require('../../models/formations');


const ScormCloud = require('@rusticisoftware/scormcloud-api-v2-client-javascript');
const { async } = require('node-stream-zip');

const defaultClient = ScormCloud.ApiClient.instance;

// Configure HTTP basic authorization: APP_NORMAL
const APP_NORMAL = defaultClient.authentications['APP_NORMAL'];
APP_NORMAL.username = '05M5ZHWNW5';
 APP_NORMAL.password = 'ayX0ZLzq0K39xNpeYvEnBfj1btcMQwAp0ihVWQcU';
 const courseApi = new ScormCloud.CourseApi();
 const expiry = new Date();
//expiry.setMinutes(expiry.getDay() + 5);
expiry.setHours(expiry.getHours() + 8);
const tokenRequest = {
    permissions: { scopes: ['read:course', 'write:course'] },
    expiry: expiry
};
//CREATE MODULE
const createModule = async (req, res) => {

    let types = configModule.moduleTypes.QUIZ;
        if (req.file) {
            console.log('=================> FILENAME '+req.file.filename);
            console.log('=================> HEADER '+req.headers.title);
            console.log('=================> HEADER '+req.headers.description);
            console.log('=================> HEADER '+req.hostname); 
            console.log('=================> HEADER '+req.headers.api);
           let extension = req.file.filename.split('.').pop();
            
            console.log('=================> EXTENSION '+extension);
            switch(extension){
                case 'mp4' :
                    types = 'video';
                    break;
                case 'pdf' :
                    types = 'pdf';
                    break;
                case 'docs'||'png'||'jpeg'||'jpg':
                    types = 'document';
                    break;
                default:
                    types = 'article';

            }
        }

    let newModule = {
        title : req.headers.title,
        description : req.headers.description,
        filePath : req.file? "/data/uploads/" + req.file.filename: "",
        typeModule : types,
        section: req.params.sectionId
    };
    
    try{
        const savedModule = await moduleService.createModule(newModule);
        const section = await sectionService.updateSectionModuleById(req.params.sectionId, savedModule.id);
            console.log(savedModule)
            res.status(httpStatus.CREATED).json(savedModule);
        
    } catch(err){
        //console.log(savedUser);
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
    
};

const getModule = async (req, res) => {
    const module = await moduleService.getmoduleById(req.params.moduleId);
    res.status(200).json(module);
} 

const getModules = async (req, res) => {
    const modules = await Module.find({deletedAt:null});
    res.status(200).json(modules);
}

const getModuleSectionId = async (req, res) => {
    const modules = await moduleService.getModuleBySectionId(req.params.sectionId);
    res.status(200).json(modules);
}

//Create Quizz module
const createQuizz = async (req, res) => {
  console.log("ID SECTIONNNNNNN +++++++: "+req.params.sectionId);
    let quizzBody = JSON.parse(req.body.quizzContent);
    let questions =[];
    let questionItem={};
    let quizContent ={}
    console.log(req.params.sectionId);
    console.log(quizzBody);
    quizzBody.map((item) => {
        
        questionItem.question =item.question;
        questionItem.answers = item.options;
        questionItem.correctAnswer = item.answer_index
        questions.push(questionItem);

    });
    quizContent.questions = questions;
    const newModule ={
        title: req.body.title,
        quizContent: quizContent,
        section: req.params.sectionId,
        typeModule : 'quizz',
    }
    try{
        const savedModule = await moduleService.createModule(newModule);
        const section = await sectionService.updateSectionModuleById(req.params.sectionId, savedModule.id);
            console.log("MODULE CREATED NEWLY*********** "+savedModule)
            res.status(httpStatus.CREATED).json(savedModule);
        
    } catch(err){
        //console.log(savedUser);
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }

};

//Create Exercice Module
const createExercice = async (req, res) =>{
  let newModule = {
    title : req.headers.title,
    description : req.headers.description,
    filePath : req.file? "/data/uploads/" + req.file.filename: "",
    typeModule : "exercice",
    sectionId: req.params.sectionId
  };
  const section = await Section.findById(req.params.sectionId);
  try{
    const exercice = await moduleService.createModule(newModule);
    console.log(exercice);
    const section = await sectionService.updateSectionModuleById(req.params.sectionId, exercice.id);
    res.status(httpStatus.CREATED).json(exercice);
  }
  catch(err){
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
  }

};

//Create Scorm Module
const createModuleScorm = async (req, res) =>{
  console.log("HEADERRRRRRRRRR: "+req.headers.toString());
  console.log("FILLLLEEEE: "+req.file.filename);
  console.log("****************SERVICE DE MODULE SCORM *******");

  const fileName = req.file.filename;
  
  let title = req.headers.title;
  let description = req.headers.description;
  let typeModule = "scorm";
  let section = req.params.sectionId;
  let sectionModel = await Section.findById(req.params.sectionId);
  let progress = 0;
    let fileSize = req.headers.size ? parseInt(req.headers.size) : 0;
    console.log("SIZZZEEE"+fileSize);
    req.on('data', (chunk) => {
        progress += chunk.length;
        res.write((`${Math.floor((progress * 100) / fileSize)} `));
        while (progress != fileSize) {
        console.log('Upload pending...', progress, fileSize);
        }
    });

  const courseFile = fs.createReadStream("/upload/"+fileName);
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+APP_NORMAL.username);
  //console.log(courseFile);
  try{
    let test = false;
    console.log(Date.now()+"scorm");
    console.log(req.file? "/upload/" + req.file.filename: "");
    const courseId = "scorm"+fileName;
    let filePath = courseId;
    console.log("current Section: "+sectionModel);
    console.log("current Section formation: "+sectionModel.formation);
    const course = await Course.findById(sectionModel.formation);
   console.log("The current course: "+course);
   console.log("The current course scormId: "+course.scormId);
   
      console.log("courseId exist: "+courseId);
      console.log("scormId exist: "+course.scormId);
      course.scormId = courseId;
      course.save();
      console.log("course updated successufully: "+course);
    
    courseApi.createUploadAndImportCourseJob(courseId, {file:courseFile}, (error, data) => {
                  console.log("Data: "+data);
                  console.log("ERROR: "+error);
           });
    
  // if(scormFile.result!=APP_NORMAL.username+courseId){
  //   console.log("SCORM CLOUD FAILED!!");
  //   // fs.unlinkSync(courseFile,(err) =>{
  //   //   if(err){
  //   //     console.log(err);
  //   //     return
  //   //   }
  //   //   console.log("file deleted successfuly!!!");
  //   // });
  //   res.send({"message":"Scorm course not founded in scorm cloud"});
  //   return {"message":"Scorm course not founded in scorm cloud"};
  // }

  let newModule = {
    title,
    description,
    filePath,
    typeModule,
    section
  };
  console.log("NNNNNEEEEEWWWW MMMODDDULLLE: "+newModule);

    const scormModule = await moduleService.createModule(newModule);
    console.log(scormModule);
    //const scormFile = await courseApi.createUploadAndImportCourseJob(Date.now()+"scorm"+req.headers.title, true,  req.file);
    //console.log("UPLOAD SCORM SUCCESS! and Id is : "+scormFile);
    const sectionUpdated = await sectionService.updateSectionModuleById(req.params.sectionId, scormModule.id);
    //res.status(httpStatus.CREATED).json(scormModule);
    res.status(200).json({"message":"MODULE CREATED SUCCESSFULY!"})
  }
  catch(err){
        console.log(err);
        res.status(500).json({"message":"Error occured on the request!"});
  }

};

const getScormCourse = async(req, res) =>{
  try{
    const module = await Module.findById(req.params.moduleId);
    console.log("MODULE ID+++++++++"+req.params.moduleId);
    const courseId = module.filePath;
    const courseLinks =  courseApi.buildCoursePreviewLaunchLink(courseId,{},(err, data) => {
        console.log("========================================> coursId to preview show: "+courseId);
        if(data){
          console.log("LLLLLLIIINNNKKKK1 : "+data.launchLink);
        res.status(200).json(data);
        }
        else{
          console.log("Course not found in scorm cloud");
          res.send({"message":"Scorm course not founded in scorm cloud"});
        }
        
    });
  }catch(err){
      res.status(500).json({"message":"ERROR ON THE SERVER!!!"})
  }
  
}

 const updateModuleComments = async (req, res) => {

    const comment = await moduleService.updateModuleCommentsById(req.params.moduleId, req.body);
    res.status(200).json(comment);
 }

 const updateModule = async (req, res) =>{
    try{
        const updatedModule = await Module.findByIdAndUpdate(
            req.params.moduleId,
            {
                $set: req.body,
            },
            { new: true}
        );
        res.status(200).json(updatedModule);
    } catch(err){
        res.status(500).json(err);
    }
 }

 const validateComment = async (req, res) =>{
    const comment = await moduleService.validateCommentById(req.params.moduleId, req.params.commentId);
    res.status(200).json(comment);
 }

 const lockComment = async (req, res) =>{
    const comment = await moduleService.lockCommentById(req.params.moduleId, req.params.commentId);
    res.status(200).json(comment);
 }

 //Get validated comments
const getValidatedModuleComments = async (req, res) => {
    const module = await moduleService.getModuleById(req.params.moduleId);
    var commentValidated = [];
    if (!module) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Module not found');
    }
    if (module.comments) {
      module.comments.map((item) =>{
        
        if(item.validated == "true"){
          commentValidated.push(item);
        }
      })
    }
    res.send(commentValidated);
  };
  
  //Get user validated comments
  const getUserdModuleComments = async (req, res) => {
    const module = await moduleService.getModuleById(req.params.moduleId);
    const userId = req.params.userId;
    var userComments = [];
    if (!module) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Module not found');
    }
    if (module.comments) {
      module.comments.map((item) =>{
        
        if(item.validated == "true" && item.userId == userId){
          userComments.push(item);
        }
      })
    }
    res.send(userComments);
  };

  //Get unValidated comments
const getUnValidatedModuleComments = async (req, res) => {
    const module = await moduleService.getModuleById(req.params.moduleId);
    var unValidated = [];
    if (!module) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Module not found');
    }
    if (module.comments) {
      module.comments.map((item) =>{
        
        if(item.validated == "false"){
          unValidated.push(item);
        }
      })
    }
    res.send(unValidated);
  };

  const getCountCourseStduentCategory = async(req, res) => {
    const countCourses = await courseService.getCountCourses();
    const countCategories = await categoryService.getCountCategory();
    const countStudent = await userService.getCountStudent();
    const response ={
      "countCourses":countCourses,
      "countCategories":countCategories,
      "countStudent":countStudent
    }
    res.status(200).json(response);
  }

  const deleteModule = async (req, res) =>{
    try{
      const module = await Module.findById(req.params.moduleId);
      module.deletedAt = Date.now();
      module.save();
      res.status(200).json({"message" : "deleted successfully!!!"});
    }
    catch(err){
      res.status(500).json({"message" : "deleting failed!"});
    }
    

  }

module.exports = {
    createModule,
    getModule,
    getModules,
    getModuleSectionId,
    createQuizz,
    updateModuleComments,
    updateModule,
    validateComment,
    lockComment,
    getValidatedModuleComments,
    getUserdModuleComments,
    getUnValidatedModuleComments,
    createExercice,
    createModuleScorm,
    getScormCourse,
    getCountCourseStduentCategory,
    deleteModule
};
