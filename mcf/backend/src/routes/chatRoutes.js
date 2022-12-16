
const express = require("express");
const controller = require("../controllers/chats/chatsControllers");

let chatRouter = express.Router();

chatRouter.post('/createChatMessage', controller.createChatMessage);

chatRouter.get('/list/:studentId/:teacherId', controller.getUserMessages);

chatRouter.post('/sendMail', controller.sendMail);

module.exports = chatRouter;