//const {verifyToken, verifyTokenAndAuthorization} = require('../users/verifyToken');
//const cryptoJS = require("crypto-js");
//const model = require('../../models/users');


const express = require("express");

var categoryRouter = express.Router();
const controller = require('../controllers/categories/categorieControllers')

//Get category list
categoryRouter.get('/list', controller.all);

categoryRouter.get('/:id', controller.one);;

categoryRouter.put('/:id', controller.edit);

categoryRouter.delete('/:id', controller.remove);

//Create category
categoryRouter.post('/create', controller.addNewCategory);



// userRouter.post('/create', myAuthorization.verifyTokenAndAdmin, controller.addNewUser);

module.exports = categoryRouter;