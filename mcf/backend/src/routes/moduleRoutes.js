const express = require("express");
const myAuthorization = require('../controllers/auth/verifyToken');
const controller = require('../controllers/modules/modulesControllers');

var moduleRouter = express.Router();


moduleRouter.post('/create', controller.createModule);





//Export module to use outside
module.exports = moduleRouter;