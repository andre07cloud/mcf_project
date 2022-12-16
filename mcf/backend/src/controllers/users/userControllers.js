
const cryptoJS = require("crypto-js");
const User = require('../../models/users');
const roles = require('../../models/roles');
const userService = require('../../services/userServices');
const httpStatus = require("http-status");
const { async } = require("node-stream-zip");
const ScormCloud = require('@rusticisoftware/scormcloud-api-v2-client-javascript');


//CREATE USER

exports.addNewUser = async (req, res) => {
    var isAdmin=false;
    if(req.body.role==roles.ROLE_ADMIN){
        isAdmin=true;
        console.log("ADDDDDMMMIIINNN");
    }
    let newUser = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        username : req.body.username,
        role: req.body.role,
        password: cryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        _creator: req.body._creator,
        isAdmin:isAdmin,
        avatar: req.file? '/data/uploads'+req.file.filename : '/data/uploads/mcf.png'

    });
    try{
        const savedUser = await newUser.save();
            console.log(savedUser)
            res.status(201).json(savedUser);
        
    } catch(e){
        //console.log(savedUser);
        console.log(e);
        res.status(500).json(e);
    }
    
};


exports.one = async(req, res) =>{
    // User.findById(req.params.userId, (err, obj) => {
    //     console.log(obj);
    //     res.status(200).json(obj);
    // }).populate('courses');
    // const user = await userService.listUserCourseById(req.params.userId);
    //res.status(200).json(user);
    const user = await User.findById(req.params.userId);
    res.status(200).json(user);
    
};


exports.all = (req, res) =>{
    User.find({deletedAt:null},(err, obj)  => {
        console.log(obj);
        res.json(obj);
    });
    
};

//List of stagiaire
exports.stagiaire = (req, res) =>{
    User.find({deletedAt:null, role:"ROLE_STAGIAIRE"},(err, obj)  => {
        console.log(obj);
        res.json(obj);
    });
    
};

//List of teachers
exports.teacher = (req, res) =>{
    User.find({deletedAt:null, role:"ROLE_FORMATEUR"},(err, obj)  => {
        console.log(obj);
        res.json(obj);
    });
    
};

exports.updateUser = async(req, res) => {
    console.log('UPDATE USER');
    console.log(req.params.userId);
    if(req.body.password){
        req.body.password = cryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }
    console.log("UPDATED BODY: "+ req.body);

    try{
      
        const user = await User.findById(req.params.userId);
        if(user){
            console.log("USER TO UPDATEEEEEEE: "+user);
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: req.body,
            },
            { new: true}
        );
        console.log("USER UPDATEDDDDDDD!!!: "+updatedUser);
        res.status(200).json(updatedUser);
    } catch(err){
        res.status(500).json(err);
    }
};

exports.remove = async(req, res) =>{
    console.log("DELETE USERRRR!!!!");
    try{
        const userDeleted= await User.findById(req.params.userId);
        userDeleted.deletedAt = Date.now();
        userDeleted.save();
        console.log("USER DELETED!!!: "+userDeleted);
        res.status(200).json({"message" : "user deleted successfully!!!"});
    }
    catch(err){
        res.status(500).json({"message" : "user deleting failed!"});
    }
   
};

exports.getCountCourseStudent = async(req, res) => {

    //API INITIALISATION
    const defaultClient = ScormCloud.ApiClient.instance;

    // Configure HTTP basic authorization: APP_NORMAL
    const APP_NORMAL = defaultClient.authentications['APP_NORMAL'];
    APP_NORMAL.username = '05M5ZHWNW5';
    APP_NORMAL.password = 'ayX0ZLzq0K39xNpeYvEnBfj1btcMQwAp0ihVWQcU';

    const OAUTH = defaultClient.authentications['OAUTH'];
    const appManagementApi = new ScormCloud.ApplicationManagementApi();
    const registrationApi = new ScormCloud.RegistrationApi();

    const expiry = new Date();
    //expiry.setMinutes(expiry.getDay + 5);
    expiry.setHours(expiry.getHours() + 8);
    //expiry.setFullYear(expiry.getFullYear);

    const tokenRequest = {
        permissions: { scopes: ['read:registration', 'write:course', 'write:registration'] },
        expiry: expiry
    };
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA: "+APP_NORMAL.username)

    appManagementApi.createToken(tokenRequest, function (error, data) {
        if (error) {
            console.error(error.response.text);
        }
        console.log("token is: " + data.result);
        OAUTH.accessToken = data.result;
        // further calls will use OAuth2 for authentication
    });

    const user = await User.findById(req.params.userId);
    setTimeout(() =>{
        console.log('Waiting...');
        if(user.courses){
            const courses = user.courses;
            courses.map((item) =>{
                if(item.registrationId){
                    const registrationId = item.registrationId;
                    const launchLinkRequest = {
                        expiry: 300,
                        redirectOnExitUrl: "google.com"
                    }
                    
                            //Calling API scorm cloud buildLaunchLink service
                        registrationApi.buildRegistrationLaunchLink(registrationId, launchLinkRequest, (error, data) =>{
                            console.log("INSIDE LINK BUILDER**********"+registrationId);
                            if(data){
                                console.log("The Launcher Link: "+data.launchLink);
                                //user.launchLink = data.launchLink;
                                const launchLink = data.launchLink;
                                console.log("USER COURSES: "+item);
                                
                                    console.log("ITEM FORMATIONiD: "+item.formationId);
                                    
                                        item.launchLink=launchLink;
                                        console.log("One map item"+item.launchLink);
                                    
                                
                                user.save();
                                console.log("INSIDE LINK BUILDER********** user link: "+item);
                                //console.log("INSIDE LINK BUILDER********** user saved: "+user);
                                return data.launchLink;
                            }
                            if(error){
                                console.log(error);
                                return error;
                            }
                        });
                    
                     
                }
            });
        }
        
    },1000);

    console.log("COUNT COURSE STUDENT: "+req.params.userId);
    try{
        const count = await userService.getCountCourseByStudent(req.params.userId);
        console.log("count formation By Student "+count);
        res.status(200).json({"countCourse": count});
    }
    catch(err){
        res.status(500).json(err);
    }
};
 //get stat of scorm course by student
 exports.getStatByUserCourseScorm = async (req, res) =>{
    //API INITIALISATION
    const defaultClient = ScormCloud.ApiClient.instance;

    // Configure HTTP basic authorization: APP_NORMAL
    const APP_NORMAL = defaultClient.authentications['APP_NORMAL'];
    APP_NORMAL.username = '05M5ZHWNW5';
    APP_NORMAL.password = 'ayX0ZLzq0K39xNpeYvEnBfj1btcMQwAp0ihVWQcU';

    const OAUTH = defaultClient.authentications['OAUTH'];
    const appManagementApi = new ScormCloud.ApplicationManagementApi();
    const registrationApi = new ScormCloud.RegistrationApi();

    const expiry = new Date();
    //expiry.setMinutes(expiry.getDay + 5);
    expiry.setHours(expiry.getHours() + 8);
    //expiry.setFullYear(expiry.getFullYear);

    const tokenRequest = {
        permissions: { scopes: ['read:registration', 'write:course', 'write:registration'] },
        expiry: expiry
    };
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA: "+APP_NORMAL.username)

    appManagementApi.createToken(tokenRequest, function (error, data) {
        if (error) {
            console.error(error.response.text);
        }
        console.log("token is: " + data.result);
        OAUTH.accessToken = data.result;
        // further calls will use OAuth2 for authentication
    });

    const user = await User.findById(req.params.userId);
    const courseId = req.params.courseId;
    if(user.courses){
        const courses = user.courses;
        courses.map((item) => {
            if(item.formationId == courseId){
                let registrationId = item.registrationId;
                const options ={
                    includeChildResults : false,
                    includeInteractionsAndObjectives : false,
                    includeRuntime : false
                };
                const instanceId = 0;
                registrationApi.getRegistrationInstanceProgress(registrationId, instanceId, options,(error, data) =>{
                    if(error){
                        res.status(500).json({"message":"States unavailable!!!: "+error});
                    }
                    if(data){
                        console.log("DATA: "+data.toString());
                        res.status(200).json(data);
                    }
                });
            }
            
        });
        
        //const registrationId = "register-scorm1669371364888_apprendre_vba_pour_excel_2016-cas_pratique-pascalrossi-scorm20043rdedition.zip";
        
    } 


 }