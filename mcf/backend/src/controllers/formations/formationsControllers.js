
const httpStatus = require('http-status');
const Formation = require("../../models/formations");
const User = require('../../models/users');
const UserInscrit = require('../../models/user_inscrits');
const courseService = require('../../services/formationServices');
const assignmentService = require('../../services/assignmentService');
const userService = require('../../services/userServices');

//CREATE FORMATION
exports.createFormation = async (req, res) => {
    
    //var categorie = await Categorie.findById(req.params.idCategorie);
    //var formateur = await User.findById(req.params.idFormateur);
    let newFormation = {
        designation : req.body.designation,
        description : req.body.description,
        niveau : req.body.niveau,
        category : req.body.category,
        image : "/data/uploads/" + req.file.filename

    };
    
    
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

//Get All Formations
exports.all = (req, res) =>{
    Formation.find({},(err, obj)  => {
        console.log(obj);
        res.status(200).json(obj);
    });
    
};

//Validated Formations
exports.validated = (req, res) =>{
    Formation.find({validated:true},(err, obj)  => {
        console.log(obj);
        res.status(200).json(obj);
    });
    
};

//Unvalidated Formations
exports.unValidated = (req, res) =>{
    Formation.find({validated:false},(err, obj)  => {
        console.log(obj);
        res.status(200).json(obj);
    });
    
};

//Get Single Formation
exports.one = (req, res) =>{
    Formation.findById(req.params.id, (err, obj) => {
        
        res.status(200).json(obj);
    });
    
};

//Delete Formation
exports.remove = (req, res) =>{
    Formation.findByIdAndDelete(req.params.id, (err, obj) => {
        
        res.status(200).json(obj);
    });
    
};
//Update formation
exports.edit = async(req, res) =>{
    try{
        const updatedFormation = await Formation.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true}
        );
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
    } catch(err){
        res.status(500).json(err);
    }

};

//Assign formation to user
exports.assignToUser = async(req, res) => {
    
    try{
        console.log("++++++++++++entered");
            const assignedFormation = await assignmentService.addAssignementById(req.params.courseId, req.params.userId);
            console.log(assignedFormation);
            console.log("++++++++++++passed");
            // const userAssigned = await userService.updateUserCourse(req.params.userId, req.params.courseId);
            // console.log(userAssigned);
            res.status(httpStatus.CREATED).json(assignedFormation);
        
    } catch(err){
        res.status(500).json(err);
    }

}

//Get all User registed
exports.allInscrit = async (req, res) =>{
    // UserInscrit.find({},(err, obj)  => {
    //     console.log(obj);
    //     res.status(200).json(obj);
    // })

    UserInscrit.find().
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