
const httpStatus = require("http-status");
const Section = require("../../models/sections");
const courseService = require('../../services/formationServices');
const sectionservice = require('../../services/sectionServices')

//CREATE FORMATION
const createSection = async (req, res) => {
    
    //var categorie = await Categorie.findById(req.params.idCategorie);
    //var formateur = await User.findById(req.params.idFormateur);
    let newSection = {
        title: req.body.title,
        description: req.body.description,
        formation: req.params.courseId
    };
    console.log(req.body)
    console.log(req.params.courseId);
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

const getSectionCourseId = async(req, res) =>{
    const sections = await sectionservice.getSectionByCourseId(req.params.courseId);
    res.status(200).json(sections);
}

const updateSection = async (req, res) => {
    try{
        const updatedSection = await Section.findByIdAndUpdate(
            req.params.sectionId,
            {
                $set: req.body,
            },
            { new: true}
        );
        res.status(200).json(updatedSection);
    } catch(err){
        res.status(500).json(err);
    }
}

const deleteSection = async (req, res) => {
    try{
        const section = await Section.findById(req.params.sectionId);
        section.deletedAt = Date.now();
        section.save();
        res.status(200).json({"message" : "deleted successfully!!!"});
    }
    catch(err){
        res.status(500).json({"message" : "deleting failed!"});
    }
}

module.exports ={
    createSection,
    getSections,
    getSection,
    getSectionCourseId,
    updateSection,
    deleteSection
}