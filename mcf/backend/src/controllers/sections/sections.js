
const httpStatus = require("http-status");
const Section = require("../../models/sections");
const courseService = require('../../services/formationServices');
const sectionservice = require('../../services/sectionServices')

//CREATE FORMATION
const createSection = async (req, res) => {
    
    //var categorie = await Categorie.findById(req.params.idCategorie);
    //var formateur = await User.findById(req.params.idFormateur);
    let newSection = req.body;
    
    try{
        const savedSection = await sectionservice.createSection(newSection);
        const updated = await courseService.updateCourseSectionById(req.params.courseId, savedSection.id);
            console.log(savedSection)
            res.status(httpStatus.CREATED).json(savedSection);
        
    } catch(err){
        //console.log(savedUser);
        console.log(err);
        res.status(500).json(err);
    }
    
};

const getSections = async(req, res) =>{
    const sections = await sectionservice.getSections();
    res.status(200).json(sections);
}

const getSection = async(req, res) =>{
    const section = await sectionservice.getSectionById(req.params.sectionId);
    res.status(200).json(section);
}

module.exports ={
    createSection,
    getSections,
    getSection
}