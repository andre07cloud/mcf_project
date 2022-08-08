
const express = require("express");
//const myAuthorization = require('../controllers/auth/verifyToken');
const controller = require('../controllers/formations/formationsControllers');
const uploadFileService = require('../services/uploadFiles');
  
const upload = uploadFileService.uploadMiddle();

var formationRouter = express.Router();


formationRouter.post('/create', upload.single("image"), controller.createFormation);

formationRouter.get('/list', controller.all);

formationRouter.get('/list/validated', controller.validated);

formationRouter.get('/list/unvalidated', controller.unValidated);

formationRouter.get('/inscrits', controller.allInscrit);

formationRouter.get('/inscrits/:id', controller.formationByUser);

formationRouter.get('/:id', controller.one);

formationRouter.delete('/:id', controller.remove);

formationRouter.put('/:id', controller.edit);

formationRouter.put('/validate/:id', controller.validateFormaTion);

formationRouter.put('/assign/:courseId/:userId', controller.assignToUser);

//Export module to use outside
module.exports = formationRouter;

