
const httpStatus = require('http-status');
const Course = require('../models/formations');
const ApiError = require('../utils/ApiError');
const path = require("path");
const multer = require("multer");
const { async } = require('node-stream-zip');

const createCourse = async (courseBody) => {
    const course = courseBody;
    return Course.create(course);
  };

const updateCourseSectionById = async (courseId, sectionId) => {
    console.log(courseId);
    const course = await Course.findById(courseId);
    console.log(course);
    if (!course) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
    }
    // Object.assign(course, updateBody);
    if(course.sections){
      course.sections.push(sectionId);
    }else{
      course.sections = [sectionId];
    }
    
    await course.save();
    return course;
  };

const getCourseById = async (courseId)=>{
    const course = await Course.findById(courseId)
     .populate({path:'sections',populate: {path:'modules'}, populate: {path: 'formation'}})
     .populate({path: 'assignments', populate: {path: 'userId'}})
     .populate({path: 'teacher'}) ;
    return course;
  }

  const deleteCourseById = async (courseId)=>{
    const course = await Course.findById(courseId);
    course.deletedAt=Date.now();
    course.save();
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

// const getAssignments = async() => {
//   const assignments = await Course.find().select('assignments')
//   //.populate({path: 'assignments', populate: {path: 'userId'}});
//   return assignments;
// };

const getAssignmentsByUserId = async(userId) => {
  const courses = await Course.find().populate({path: 'assignments'});
  const assignments =[];
  courses.map((item) =>{
    assignments.push(item.assignments);
  })
  const userCourses =[];
  assignments.map((item) => {
    
    if(item.userId == userId)
    userCourses.push(item);
  });
  return userCourses;
}

const getCoursesByTeacherId = async(userId) => {
  console.log(userId);
  const courses = await Course.find({deletedAt:null, teacher:userId})
  .populate({path:"assignments", populate: {path:'userId'}})
  .populate({path:'sections',populate: {path:'modules'}})
  .populate({path: 'teacher'})
  .populate({path: 'category'});
 
  return courses;
}

const getStudentByTeacherId = async(userId) => {
  console.log(userId);
  const courses = await Course.find({deletedAt:null, teacher:userId})
  .populate({path:"assignments", populate: {path:'userId'}});
  const assignments = [];
  console.log("Bonjour")
  courses.map((item) => {
      if(item.assignments.length != 0){
          //console.log(item.assignments)
          assignments.push(item.assignments);
      }
  });
  const distinctAssignments = [];
  //console.log(distinctAssignments);
  assignments.map((item) => {
      item.map((item1) => {
          console.log(item1);
          distinctAssignments.push(item1);
      })
  });
  console.log("FIRST: "+distinctAssignments.length);
  for(let i=0; i<distinctAssignments.length-1; i++){
      console.log("le i: "+i);
              console.log(distinctAssignments[i].userId.id);
      console.log("i: "+ i,distinctAssignments.length);
      j=distinctAssignments.length-1;
      while(j>i){
          if(distinctAssignments[i].userId.id==distinctAssignments[j].userId.id){
              
              console.log(j);
              console.log(distinctAssignments[j].userId.id);
              distinctAssignments.splice(j,1);
              //distinctAssignments[j].userId=;
          }
          j--;
      }
      
  }
 
  return distinctAssignments;
}

const getCoursesAndTeachers = async() => {
  const courses = await Course.find({deletedAt:null})
  .populate({path:'sections',populate: {path:'modules'}})
  .populate({path: 'teacher'})
  
 
  return courses;
}

const getCountAssignmentsByTeacherId = async(userId) => {
  const courses = await Course.find({deletedAt:null, teacher:userId})
  .populate({path:'sections',populate: {path:'modules'}})
  .populate({path: 'teacher'})
  .populate({path: 'category'})
  .populate({path:"assignments"});
  const assignments = [];
   courses.map((item) =>{
    assignments.push(item.assignments);
   });
   console.log(assignments);
  if(assignments){
    return assignments.length;
  }
  else{
    return 0;
  }
  
}

const getCountCourseByTeacherId = async(userId) => {
  const courses = await Course.find({deletedAt:null, teacher:userId});
  
   console.log(courses);
  if(courses){
    return courses.length;
  }
  else{
    return 0;
  }
  
}


const getCountAssignedCourse = async() => {
  const courses = await Course.find({deletedAt:null});
  
   console.log(courses);
   let count = 0;
   
  if(courses){
    courses.map((item) => {
      const assignment = item.assignments;
      if(assignment.length !=0){
        console.log("length: "+assignment.length);
        count++;
        console.log("Assignments not null: "+assignment);
        console.log("count: "+count);
      }
   });
    
  }
  return count;
  
}

const getCountCourses = async() => {
  const countCourse = await Course.countDocuments();
  return countCourse;
};

//beginDate
const getCountAssignedByYear = async(year) =>{
  const courses = await Course.find({deletedAt:null});
  let count = 0;
  courses.map((item) => {
    if(item.assignments){
      const assignment = item.assignments;
      for(elt of assignment){
        if(elt.beginDate.getYear() == year){
          count++;
        }
      }
    }
          
  });
  return count;
}






module.exports = {
    createCourse,
    getCourseById,
    deleteCourseById,
    updateCourseSectionById,
    imageCourseUpload,
    getAssignmentsByUserId,
    getCoursesByTeacherId,
    getCountAssignmentsByTeacherId,
    getCountCourseByTeacherId,
    getCountAssignedCourse,
    getCountCourses,
    getCountAssignedByYear,
    getCoursesAndTeachers,
    getStudentByTeacherId
  };