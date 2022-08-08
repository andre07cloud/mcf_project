
const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const superUser = require("./src/controllers/users/super_admin");
const initDb = require('./initdb');

module.exports = async function connection(){
    try {
        mongoose.Promise = global.Promise;
        mongoose.connect(process.env.MONG0_URL, {
        user: process.env.DBUSERNAME, 
        pass: process.env.DBPWD,   
        useNewUrlParser: true,
        useUnifiedTopology: true,

        });
        console.log('base cree avec succes ');
        //Create a first super user automatically

        db =  mongoose.connection;
        db.on("error", console.error.bind(console, "connection error: "));
        db.once("open", () => {
            console.log('mongodb running...');

            superUser.createSuperUser();
            initDb.createCategorieInit();
            initDb.createCourInit();
            initDb.createExerciceInit();
            initDb.createFormationInit();
            initDb.createUserInit();
            initDb.createQuestionInit();
            
        });

        
    } catch (error) {
        console.log(error);
        console.log('Could not connect to database!');
    }
}