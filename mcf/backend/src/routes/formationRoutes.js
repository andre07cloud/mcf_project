
const express = require("express");
//const myAuthorization = require('../controllers/auth/verifyToken');
const controller = require('../controllers/formations/formationsControllers');
const uploadFileService = require('../services/uploadFiles');
  
const upload = uploadFileService.uploadMiddle();

var formationRouter = express.Router();


formationRouter.post('/create/:categoryId', upload.single("image"), controller.createFormation);

formationRouter.get('/list', controller.getcourses);

formationRouter.get('/list/assignments', controller.getcoursesAssignments);

formationRouter.get('/assignments', controller.getcourses);

formationRouter.get('/list/validated/:categoryId', controller.validated);

formationRouter.get('/list/unvalidated/:categoryId', controller.unValidated);

formationRouter.get('/list/validated', controller.getValidated);

formationRouter.get('/list/unvalidated', controller.getUnValidated);

formationRouter.get('/search/courses', controller.getSchearchByName);

formationRouter.get('/inscrits/:id', controller.formationByUser);

formationRouter.get('/course/:couserId', controller.getcourse);

formationRouter.get('/teacher/:userId', controller.getCoursesByTeacher);

formationRouter.get('/teacher/stagiaires/:userId', controller.getStudentByTeacher);

formationRouter.get('/teachers/courses', controller.getCoursesAndTeacher);

formationRouter.get('/teacher/:userId/countStudent', controller.getCountAssignmentsByTeacher);

formationRouter.get('/teacher/:userId/countCourse', controller.getCountCourseByTeacher);

formationRouter.get('/assignments/countAssigned', controller.getCountAssignedCourse);

formationRouter.get('/category/:categoryId', controller.getCourseByCategoryId);

formationRouter.get('/stagiaire/:userId', controller.getCoursesByUser);

formationRouter.get('/stagiaire/teachers/:userId', controller.getTeacherByStudent);


formationRouter.get('/statistic/sales/:year', controller.getCountAssignedByYear);

formationRouter.patch('/delete/:courseId', controller.remove);

formationRouter.patch('/:id', controller.edit);

formationRouter.patch('/validate/:id', controller.validateFormaTion);

formationRouter.patch('/assign/:courseId/:userId', controller.assignToUser);

//Export module to use outside
module.exports = formationRouter;

