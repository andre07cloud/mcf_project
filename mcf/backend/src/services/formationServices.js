
const httpStatus = require('http-status');
const Course = require('../models/formations');
const ApiError = require('../utils/ApiError');
const path = require("path");
const multer = require("multer");

const createCourse = async (courseBody) => {
    const course = courseBody;
    return Course.create(course);
  };

const updateCourseSectionById = async (courseId, sectionId) => {
    const course = await Course.findById(courseId);
    if (!course) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
    }
    // Object.assign(course, updateBody);
    course.sections.push(sectionId);
    await course.save();
    return course;
  };

  const getCourseById = async (courseId)=>{
    const course = await Course.findById(courseId);
    return course;
  }


const imageCourseUpload = (req, res, next) =>{
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./public/datas/uploads/");
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
      },
    });
    const upload = multer({ storage: storage });
    upload.single("image");
    next();
};












module.exports = {
    createCourse,
    
    getCourseById,
    
    updateCourseSectionById,
    imageCourseUpload

  };