
const Module = require('../models/modules');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const createModule = async (moduleBody) => {
    return Module.create(moduleBody);
  };

const getmoduleById = async(moduleId) =>{
  const module = await Module.findById(moduleId)
  .populate({path: 'quizContent', populate: {path: 'questions'}});
  return module;
};

const getModuleBySectionId = async (sectionId) =>{
  const modules = await Module.find({section: sectionId, deletedAt:null});
  return modules;
}

const deleteModuleById = async (moduleId)=>{
  const module = await Module.findById(moduleId);
  module.deletedAt=Date.now();
  module.save();
  return module;
}

const updateModuleCommentsById = async (moduleId, updateBody) =>{
  const module = await Module.findById(moduleId);
  if(module){
    module.comments? module.comments.push(updateBody): module.comments=[updateBody];
  }
  else{
    return new ApiError(httpStatus.NOT_FOUND, 'Module not found');
  }
  module.save();
  return module;
}
//Validate the comment by Comment Id
const validateCommentById = async(moduleId, commentId) => {
  const module = await Module.findById(moduleId);
  if(module){
    module.comments.map((item)=>{
      if(item.id == commentId){
        item.validated = 'true';
      }

    });
  }
  else{
    return new ApiError(httpStatus.NOT_FOUND, 'Module not found');
  }
  module.save();
  return module;
}
//Close the comment by Comment Id
const lockCommentById = async(moduleId, commentId) => {
  const module = await Module.findById(moduleId);
  if(module){
    module.comments.map((item)=>{
      if(item.id == commentId){
        item.validated = 'false';
      }

    });
  }
  else{
    return new ApiError(httpStatus.NOT_FOUND, 'Module not found');
  }
  module.save();
  return module;
}

const validatedCommentByModuleId = async (moduleIs) =>{
  
}




  module.exports = {
    createModule,
    getmoduleById,
    deleteModuleById,
    getModuleBySectionId,
    updateModuleCommentsById,
    validateCommentById,
    lockCommentById
  }