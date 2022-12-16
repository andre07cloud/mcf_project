
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const formationServices = require('../services/formationServices');
const Course = require('../models/formations');
const User = require('../models/users');





// APP_NORMAL.username = 'PAscalRossi';
// APP_NORMAL.password = 'Mcf2022!';
    // OR

// Configure OAuth2 access token for authorization: OAUTH
// Note: HTTP basic auth must be configured for the initial call to create an OAuth2 token


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
  const addAssignementById = async (courseId, userId, registrationId) => {
    const course = await Course.findById(courseId);
    const user = await User.findById(userId);
    if (!course) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
    }
    console.log("*****addAssignmentById firsssssssssssttttt");
    if (course.assignments) {
      course.assignments.push({ userId: userId, beginDate: Date.now() });
    } else {
      course.assignments = [{ userId: userId, beginDate: Date.now() }];
    }
  
    // await User.findByIdAndUpdate({ _id: userId }, { $addToSet: { courses: courseId } });
    if(user.courses){
      user.courses.push({formationId: courseId, launchLink:"", registrationId : registrationId})
    }
    else{
      user.courses = [{formationId: courseId, launchLink:"", registrationId : registrationId}];
    }
    user.assigned = true;
    user.save();
    console.log("*****addAssignmentById----------passed");
    await course.save();
    console.log("*****addAssignmentById----------saved");
    return course;
  };
  
  module.exports = {
    getAssignmentsByID,
    updateAssignmentsByID,
    addAssignementById,
  };
