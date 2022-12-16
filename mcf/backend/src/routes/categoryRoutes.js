//const {verifyToken, verifyTokenAndAuthorization} = require('../users/verifyToken');
//const cryptoJS = require("crypto-js");
//const model = require('../../models/users');


const express = require("express");

var categoryRouter = express.Router();
const controller = require('../controllers/categories/categorieControllers');
const uploadFileService = require('../services/uploadFiles');
  
const upload = uploadFileService.uploadMiddle();

//Get category list
categoryRouter.get('/list', controller.getCategories);

categoryRouter.get('/:id', controller.one);;

categoryRouter.patch('/:id', controller.updateCategory);

categoryRouter.patch('/delete/:categoryId', controller.remove);

//Create category
categoryRouter.post('/create', upload.single("image"), controller.addNewCategory);



// userRouter.post('/create', myAuthorization.verifyTokenAndAdmin, controller.addNewUser);

module.exports = categoryRouter;