const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const User = require('../models/users');
const { async } = require('node-stream-zip');
const roles = require('../models/roles');


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
};

const deleteUserById = async (userId)=>{
    const user = await User.findById(userId);
    user.deletedAt=Date.now();
    user.save();
    return user;
};

const getCourseByUserId = async(userId) =>{
    const user = await User.findById(userId)
        .populate({path: 'courses', populate: {path: 'formationId', populate:{ path: 'sections'}} })
        .populate({path: 'courses', populate: {path: 'formationId', populate:{ path: 'teacher'}} });
        console.log("********************ENTERED");
        console.log("LE USER+++++: ");
        if(user){
            
            const courses = user.courses;
            return courses;
        }
        
}

const getTeacherByStudentId = async(userId) =>{
    const user = await User.findById(userId)
        // .populate({path: 'courses', populate: {path: 'formationId', populate:{ path: 'sections'}} })
        .populate({path: 'courses', populate: {path: 'formationId', populate:{ path: 'teacher'}} });
        console.log("********************ENTERED");
        console.log("LE USER+++++: ");
        if(user){
            
            const courses = user.courses;
            const teachers = [];
            courses.map((item) => {
                teachers.push(item.formationId.teacher);
                console.log(item.formationId.teacher);
            });
            console.log(teachers);
            for(let i=0; i<teachers.length-1; i++){
                console.log("le i: "+i);
                        console.log(teachers[i].id);
                console.log("i: "+ i,teachers.length);
                j=teachers.length-1;
                while(j>i){
                    if(teachers[i].id==teachers[j].id){
                        
                        console.log(j);
                        console.log(teachers[j].id);
                        teachers.splice(j,1);
                        //distinctAssignments[j].userId=;
                    }
                    j--;
                }
                
            }
            console.log("teachers :"+teachers);
            return teachers;
        }
        
}

const getCountStudent = async() => {
    const countStudent = await User.countDocuments({role:roles.ROLE_STAGIAIRE});
    return countStudent;
}

const getCountCourseByStudent = async (userId) => {
    console.log("USSSERR id: "+userId);
    const user = await User.findById(userId);
    let count = 0;
    console.log("STUDENT1: "+user.courses);
    if(user.courses){
        const courses = user.courses;
        console.log(courses.length);
        count = courses.length;
    }
    console.log("STUDENT2: "+count);
    return count;
}
    


module.exports ={
    updateUserCourse,
    listUserCourseById,
    deleteUserById,
    getCourseByUserId,
    getCountStudent,
    getCountCourseByStudent,
    getTeacherByStudentId
}