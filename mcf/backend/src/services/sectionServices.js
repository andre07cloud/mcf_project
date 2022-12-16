

const httpStatus = require('http-status');

const Section = require('../models/sections');
const ApiError = require('../utils/ApiError');

const createSection = async (sectionBody) => {
    return Section.create(sectionBody);
};

const 
updateSectionModuleById = async (sectionId, moduleId) => {
    console.log("UUUUPPDAAATE SECTION MODULE*******: "+sectionId);
    const section = await Section.findById(sectionId);
    console.log("UUUUPPDAAATE SECTION MODULE 2*******: "+sectionId);
    console.log("La SSSSEEEECCCCCTIIIIONNNN+++++: "+section);
    if (!section) {
      
      throw new ApiError(httpStatus.NOT_FOUND, 'Section not found');
    }
    section.modules.push(moduleId);
    await section.save();
    return section;
  };

  const getSectionById = async (id) => {
    return Section.findById(id)
            .populate({path: 'modules'})
    ;
  };

  const getSections = async () => {
    return Section.find({deletedAt:null});
  };

  const deleteSectionById = async (sectionId)=>{
    const section = await Section.findById(sectionId);
    section.deletedAt=true;
    section.save();
    return section;
  }

const getSectionByCourseId = async (courseId) => {
  
  const sections = await Section.find({deletedAt:null,formation: courseId}).populate({path: 'modules'});
  console.log("Sections"+sections)
  return sections;
}



module.exports = {
    createSection,
    getSections,
    getSectionById,
    deleteSectionById,
    updateSectionModuleById,
    getSectionByCourseId
  };