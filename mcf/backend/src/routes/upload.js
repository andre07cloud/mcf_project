const upload = require('../middleware/upload');
const express = require('express');
const uploadRouter = express.Router();
const controller = require('../controllers/uploads/uploadsControllers');


//Uplodas routes
uploadRouter.post("/uploads", upload.single("file"), controller.uploadFile);

uploadRouter.get("/:filname", controller.getOnfile);

module.exports = uploadRouter;