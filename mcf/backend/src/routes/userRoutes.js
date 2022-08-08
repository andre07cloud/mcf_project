const express = require("express");
const controller = require('../controllers/users/userControllers');
const auth = require('../controllers/auth/authentification');
const myAuthorization = require('../controllers/auth/verifyToken');

var userRouter = express.Router() ;

// Get user list
     userRouter.get('/list', controller.all);
//List of stagiaire
userRouter.get('/list/stagiaire', controller.stagiaire);

//Create user
     userRouter.post('/create', controller.addNewUser);
        
//Update user
        userRouter.put('/:userId', controller.updateUser); 
//Delete user
    userRouter.delete('/:userId', controller.remove);
// Show user details
    userRouter.get('/:userId', controller.one);
        
    //************LOGIN ROUTE********************
    userRouter.post('/login', auth.login);
    //**************************************** *//
    



//Export route to be used on another place
module.exports = userRouter;