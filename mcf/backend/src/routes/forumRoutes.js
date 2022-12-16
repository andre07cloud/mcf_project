
const express = require("express");
const controller = require('../controllers/forums/forumControllers');
var forumRouter = express.Router();

forumRouter.post('/createMessage', controller.createMessage);

forumRouter.get('/list', controller.getMessages);


module.exports = forumRouter;