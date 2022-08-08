
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const formationServices = require('../services/formationServices');
const Course = require('../models/formations');
const User = require('../models/users');


const getAssignmentsByID = async (courseId) => {
    const course = await Course.findById(courseId).populate('assignments');
    return course;
  };
  
  /**
   * Update course by id
   * @param {ObjectId} courseId
   * @param {Object} updateBody
   * @returns {Promise<Course>}
   */
  const updateAssignmentsByID = async (courseId, updateBody) => {
    const course = await getCourseById(courseId);
  
    if (updateBody.assignments) {
      await Promise.all(
        updateBody.assignments.map(async (item) => {
          if (course.assignments.filter((courseItem) => `${courseItem.user}` === `${item.user}`).length === 0) {
            const response = await Response.create({ userId: item.user, courseId });
            course.responses.push(response.id ? response.id : response._id);
            await User.findByIdAndUpdate({ _id: item.user }, { $addToSet: { courses: courseId } });
          }
        })
      );
    } else {
      return null;
    }
  
    if (!course) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
    }
    Object.assign(course, updateBody);
    await course.save();
    return course;
  };
  
  /**
   * Update course by id
   * @param {ObjectId} courseId
   * @param {Object} updateBody
   * @returns {Promise<Course>}
   */
  const addAssignementById = async (courseId, userId) => {
    const course = await Course.findById(courseId);
    console.log("*****addAssignmentById");
    console.log(courseId);
  
    if (!course) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
    }
    console.log("*****addAssignmentById firsssssssssssttttt");
    if (course.assignments) {
      course.assignments.push({ user: userId, beginDate: Date.now() });
    } else {
      course.assignments = [{ user: userId, beginDate: Date.now() }];
    }
    // const response = await Response.create({ userId, courseId });
  
    // if (!response) {
    //   throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Response creation error');
    // }
  
    // if (course.responses) {
    //   course.responses.push(response.id);
    // } else {
    //   course.responses = [response.id];
    // }
  
    await User.findByIdAndUpdate({ _id: userId }, { $addToSet: { courses: courseId } });
    console.log("*****addAssignmentById----------passed");
    await course.save();
    return course;
  };
  
  module.exports = {
    getAssignmentsByID,
    updateAssignmentsByID,
    addAssignementById,
  };