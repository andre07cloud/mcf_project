const express = require("express");
const myAuthorization = require('../controllers/auth/verifyToken');
const controller = require('../controllers/sections/sections');

var sectionRouter = express.Router();


sectionRouter.post('/create/:courseId', controller.createSection);
sectionRouter.get('/list', controller.getSections);
sectionRouter.get('/:sectionId', controller.getSection);





//Export module to use outside
module.exports = sectionRouter;
