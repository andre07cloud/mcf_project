const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const User = require('../models/users');


const updateUserCourse = async(userId,courseId) =>{

    const user = await User.findById(userId);
    if(user.courses){
        user.courses.push(courseId);
    }
    else{
        user.courses = [courseId];
    }
    await user.save();
    return user;
}

const listUserCourseById = async(userId) =>{
    const user = await User.findById(userId);
    return user;
}


module.exports ={
    updateUserCourse,
    listUserCourseById
}