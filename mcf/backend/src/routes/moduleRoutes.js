const express = require("express");
const myAuthorization = require('../controllers/auth/verifyToken');
const controller = require('../controllers/modules/modulesControllers');
const uploadFileService = require('../services/uploadFiles');

const upload = uploadFileService.uploadMiddle();
const uploadScorm = uploadFileService.uploadScormMiddle();

var moduleRouter = express.Router();


moduleRouter.post('/create/:sectionId', upload.single('file'), controller.createModule);
moduleRouter.post('/create/scorm/:sectionId', uploadScorm.single('file'), controller.createModuleScorm);
moduleRouter.post('/createQuiz/:sectionId', controller.createQuizz);
moduleRouter.post('/createExercice/:sectionId', controller.createExercice);
moduleRouter.route('/:moduleId')
.get(controller.getModule);

moduleRouter.get('/scorm/:moduleId', controller.getScormCourse);
moduleRouter.get('/list', controller.getModules);
moduleRouter.get('/section/:sectionId', controller.getModuleSectionId);
moduleRouter.get('/commentValidated/:moduleId', controller.getValidatedModuleComments);
moduleRouter.get('/commentUnValidated/:moduleId', controller.getUnValidatedModuleComments);

moduleRouter.get('/statistics/countDocuments', controller.getCountCourseStduentCategory);

moduleRouter.patch('/comments/create/:moduleId', controller.updateModuleComments);
moduleRouter.patch('/:moduleId', controller.updateModule);
moduleRouter.patch('/delete/:moduleId', controller.deleteModule);
moduleRouter.patch('/:moduleId/:commentId', controller.validateComment);
moduleRouter.patch('/:moduleId/:commentId/lock', controller.lockComment);







//Export module to use outside
module.exports = moduleRouter;