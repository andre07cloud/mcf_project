
const httpStatus = require('http-status');
const Formation = require("../../models/formations");
const User = require('../../models/users');
const UserInscrit = require('../../models/user_inscrits');
const courseService = require('../../services/formationServices');
const assignmentService = require('../../services/assignmentService');
const userService = require('../../services/userServices');
const categoryService = require('../../services/categoryServices');
const { async } = require('node-stream-zip');
const ScormCloud = require('@rusticisoftware/scormcloud-api-v2-client-javascript');
const Course = require("../../models/formations");


//CREATE FORMATION
exports.createFormation = async (req, res) => {
    
    //var categorie = await Categorie.findById(req.params.idCategorie);
    //var formateur = await User.findById(req.params.idFormateur);
    let newFormation = {
        title : req.headers.title,
        description : req.headers.description,
        niveau : req.headers.niveau,
        teacher: req.headers.userid,
        countModules: req.headers.countmodule,
        countSections: req.headers.countsection,
        duration: req.headers.duration,
        category : req.params.categoryId,
        image : req.file? "/data/uploads/" + req.file.filename : "/data/uploads/mcf.png"

    };
    console.log(newFormation);
    console.log(req.headers);
    
    
    try{
        const categoryId = req.params.categoryId

        const savedFormation = await courseService.createCourse(newFormation);
            console.log(savedFormation);
        const category = await categoryService.updateCategoryByformationId(categoryId, savedFormation.id);  
            res.status(httpStatus.CREATED).json(savedFormation);
        
    } catch(err){
        //console.log(savedUser);
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
    
};

//Get All Formations
exports.getcourses = async (req, res) =>{
    try{
        const courses = await Formation.find({deletedAt:null, validated:true})
        res.status(200).json(courses);
    }
    catch(err){
        res.status(500).json({"message" : "Error encountered!!!"});
    }
    
    
};

//Get All student by teacher
exports.getStudentByTeacher = async (req, res) =>{
    try{
        const assignments = await courseService.getStudentByTeacherId(req.params.userId)
        res.status(200).json(assignments);
    }
    catch(err){
        res.status(500).json({"message" : "Error encountered!!!"});
    }
    
    
};


//Get All Formations assignments
exports.getcoursesAssignments = async (req, res) =>{
    try{
        const courses = await Formation.find({deletedAt:null, validated:true})
            .populate({path: 'assignments', populate: {path: 'userId', populate: {path : 'courses', populate: {path: 'formationId'} }}});
        const assignments = [];
        console.log("Bonjour")
        courses.map((item) => {
            if(item.assignments.length != 0){
                //console.log(item.assignments)
                assignments.push(item.assignments);
            }
        });
        const distinctAssignments = [];
        const uniqueAssignments = [];
        //console.log(distinctAssignments);
        assignments.map((item) => {
            item.map((item1) => {
                console.log(item1);
                distinctAssignments.push(item1);
            })
        });
        console.log("FIRST: "+distinctAssignments.length);
        for(let i=0; i<distinctAssignments.length-1; i++){
            console.log("le i: "+i);
                    console.log(distinctAssignments[i].userId.id);
            console.log("i: "+ i,distinctAssignments.length);
            j=distinctAssignments.length-1;
            while(j>i){
                if(distinctAssignments[i].userId.id==distinctAssignments[j].userId.id){
                    
                    console.log(j);
                    console.log(distinctAssignments[j].userId.id);
                    distinctAssignments.splice(j,1);
                    //distinctAssignments[j].userId=;
                }
                j--;
            }
            
        }
        //console.log(distinctAssignments)
        res.status(200).json(distinctAssignments);
    }
    catch(err){
        res.status(500).json({"message" : "Error encountered!!!"});
    }
    
    
};

//Validated Formations by CategoryId
exports.validated =async (req, res) =>{
    const courses = await Formation.find({deletedAt:null, validated:true, category: req.params.categoryId})
     .populate({path:'sections',populate: {path:'modules'}})
     .populate({path: 'assignments', populate: {path: 'userId'}})
     .populate({path: 'teacher'}) ;
     res.status(200).json(courses);
};

//Validated Formations
exports.getValidated =async (req, res) =>{
    const courses = await Formation.find({deletedAt:null, validated:true})
     .populate({path:'sections',populate: {path:'modules'}})
     .populate({path: 'assignments', populate: {path: 'userId'}})
     .populate({path: 'teacher'}) ;
     res.status(200).json(courses);
};

//Unvalidated Formations by CategoryId
exports.unValidated = async (req, res) =>{
    const courses = await Formation.find({deletedAt:null, validated:false, category: req.params.categoryId});
    res.status(200).json(courses);
};

//Unvalidated Formations
exports.getUnValidated = async (req, res) =>{
    const courses = await Formation.find({deletedAt:null, validated:false});
    res.status(200).json(courses);
};

//Get Single Formation
exports.getcourse = async(req, res) =>{
   const course = await courseService.getCourseById(req.params.couserId);
   res.status(200).json(course);
};

//Delete Formation
exports.remove = async (req, res) =>{
    try{
        const course = await Formation.findById(req.params.courseId);
        course.deletedAt = Date.now();
        course.save();
        res.status(200).json({"message" : "deleted successfully!!!"});
    }
    catch(err){
        res.status(500).json({"message" : "deleting failed!"});
      } 
};
//Update formation
exports.edit = async(req, res) =>{
    console.log(req.body);
    try{
        const updatedFormation = await Formation.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true}
        );
        console.log(updatedFormation);
        res.status(200).json(updatedFormation);
    } catch(err){
        res.status(500).json(err);
    }
    
};

//Validate formation by Admin
exports.validateFormaTion = async(req, res) => {
        
    try{
        var updatedFormation = await Formation.findById(req.params.id);
        updatedFormation.validated =true;
        const savedFormation = await updatedFormation.save();
        res.status(200).json(savedFormation);
    }catch(err){
        res.status(500).json(err);
    }

};

//Assign formation to user
exports.assignToUser = async(req, res) => {
    
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

    console.log("++++++LE BODY"+req.body);
    console.log("++++++LE COURSE"+req.params.courseId);
    console.log("++++++LE USER"+req.params.userId);
    const course = await Course.findById(req.params.courseId);
    const user = await User.findById(req.params.userId);
      console.log("scormId of course: "+course.scormId);
      const registration = {
        courseId: course.scormId,
        learner: {
          id: "learner-"+course.scormId,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        },
        registrationId: "register-"+course.scormId
      };
    
    console.log("The registration Body learner: "+registration.learner.id);
    console.log("The registration Body learner: "+registration.learner.email);
    console.log("The registration Body learner: "+registration.learner.firstName);
    console.log("The registration Body learner: "+registration.registrationId);
    console.log("*****addAssignmentById");
    console.log("Registration courseId: "+registration.courseId);
    
    try{
        
            console.log("######### BEFORE CREATION OF REGISTRATION*****************");
            registrationApi.createRegistration(registration, (error, data) =>{

                    console.log("CREATION OF REGISTRATION*****************");
                    console.log("The registration Body: "+registration);
                    console.log("My Data Registration: "+data);
                    if(error){
                        console.log("An error occured: "+error);
                    }
                    //return data;
            } );
            console.log("REGISTRATION MADE SUCCESSFULLY!!!");
            
            const registrationId = registration.registrationId;
            
            console.log("++++++++++++entered");
                const assignedFormation = await assignmentService.addAssignementById(req.params.courseId, req.params.userId, registrationId);
                console.log(assignedFormation);
                console.log("++++++++++++passed");
            // const userAssigned = await userService.updateUserCourse(req.params.userId, req.params.courseId);
            // console.log(userAssigned);
            
        res.status(200).json({"message":"student assigned successfully!!!"});
        
    } catch(err){
        res.status(500).json(err);
    }

}

//Get all User course
exports.getCoursesByUser = async (req, res) =>{

    const user = await User.findById(req.params.userId);
    const courses = await userService.getCourseByUserId(req.params.userId);
    console.log("====>COURSE BY USER: "+courses);
    
    res.status(200).json(courses);
};

//Get teacher by Student
exports.getTeacherByStudent = async (req, res) =>{

    const user = await User.findById(req.params.userId);
    const teachers = await userService.getTeacherByStudentId(req.params.userId);
    console.log("====>COURSE BY USER: "+teachers);
    
    res.status(200).json(teachers);
};

//Get formation by user
exports.formationByUser = (req, res) =>{
    UserInscrit.findOne({user: req.params.id}).
    populate({
        path:"formations", model:"Formation",
        populate:{path: "cours", model: "Cour"}
    }).
    populate("user").
    exec((err, obj) =>{
    console.log(obj);
    res.status(200).json(obj);
})
    
};

//Add assignment to one user
exports.addAssignmentToyUser = async (req, res) =>{
    
    try{
        const savedFormation = await courseService.createCourse(newFormation);
            console.log(savedFormation)
            res.status(httpStatus.CREATED).json(savedFormation);
        
    } catch(err){
        //console.log(savedUser);
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
    
};

exports.getCourseByCategoryId = async(req, res) =>{

    const courses = Formation.find({category: req.params.categoryId})
        .populate({path:'sections',populate: {path:'modules'}})
        .populate({path: 'assignments', populate: {path: 'userId'}})
        .populate({path: 'teacher'}) ;
        console.log(courses);
    res.status(200).json(courses);

}

exports.getCoursesByTeacher = async(req, res) => {
    const courses = await courseService.getCoursesByTeacherId(req.params.userId);
    res.status(200).json(courses);
}

exports.getCoursesAndTeacher = async(req, res) => {
    const courses = await courseService.getCoursesAndTeachers();
    res.status(200).json(courses);
}

exports.getCountAssignmentsByTeacher = async(req, res) => {
    const countAssignments = await courseService.getCountAssignmentsByTeacherId(req.params.userId);
    res.status(200).json({"countStudent":countAssignments});
}

exports.getCountCourseByTeacher = async(req, res) => {
    const countCourses = await courseService.getCountCourseByTeacherId(req.params.userId);
    res.status(200).json({"countCourse":countCourses});
}

exports.getCountAssignedCourse = async(req, res) => {
    const countCourses = await courseService.getCountAssignedCourse();
    res.status(200).json({"countCourse":countCourses});
}

exports.getCountAssignedByYear = async (req, res) => {
    const countAssignments = await courseService.getCountAssignedByYear(req.params.year);
    res.status(200).json({"countAssignments":countAssignments});
}

//Make a global research by course title
exports.getSchearchByName = async (req, res) => {
    try{ 
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        let sort = req.query.sort || "rating";
        let title = req.query.title || "All";
        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
        let sortBy = {};
        if(sort[1]){
            sortBy[sort[0]] = sort[1];
        }
        else{
            sortBy[sort[0]] = "asc";
        }
        const courses = await Formation.find({ title : { $regex: search, $options: "i" } })
                .where("title")
                .sort(sortBy)
                .skip(page * limit)
                .limit(limit);
        const total = await Formation.countDocuments({
            title : { $regex: search, $options: "i" },
        });

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            courses,
        };
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({err: true, message: "Internal Server Error" });
    }
  }