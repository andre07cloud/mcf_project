const express = require("express");
const controller = require('../controllers/users/userControllers');
const auth = require('../controllers/auth/authentification');
const myAuthorization = require('../controllers/auth/verifyToken');
const uploadFileService = require('../services/uploadFiles');
var userRouter = express.Router() ;

const upload = uploadFileService.uploadMiddle();
// Get user list
     userRouter.get('/list', controller.all);
//List of stagiaire
userRouter.get('/list/stagiaire', controller.stagiaire);

userRouter.get('/list/teacher', controller.teacher);

//Create user
    userRouter.post('/create', upload.single('file'), controller.addNewUser);
        
//Update user
    userRouter.patch('/:userId', controller.updateUser); 
//Delete user
    userRouter.patch('/delete/:userId', controller.remove);
// Show user details
    userRouter.get('/:userId', controller.one);
        
    //************LOGIN ROUTE********************
    userRouter.post('/login', auth.login);
    //**************************************** *//
    
//Get count course By Student
userRouter.get('/getCountCourses/:userId', controller.getCountCourseStudent);
//Get Student Progression in Scorm Course
userRouter.get('/getStatSCorm/:userId/:courseId', controller.getStatByUserCourseScorm);


//Export route to be used on another place
module.exports = userRouter;