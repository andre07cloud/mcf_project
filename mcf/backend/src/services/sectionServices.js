

const httpStatus = require('http-status');

const Section = require('../models/sections');
const ApiError = require('../utils/ApiError');

const createSection = async (sectionBody) => {
    return Section.create(sectionBody);
};

const updateSectionModuleById = async (sectionId, moduleId) => {
    const section = await getSectionById(sectionId);
    if (!section) {
      await Module.findById(id).remove();
      throw new ApiError(httpStatus.NOT_FOUND, 'Section not found');
    }
    section.modules.push(moduleId);
    await section.save();
    return section;
  };

  const getSectionById = async (id) => {
    return Section.findById(id);
  };

  const getSections = async () => {
    return Section.find();
  };





module.exports = {
    createSection,
    getSections,
    getSectionById,
    
    updateSectionModuleById,
    
  };