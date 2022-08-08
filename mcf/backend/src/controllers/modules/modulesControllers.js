
const httpStatus = require('http-status');

const Module = require("../../models/modules");
const moduleService = require('../../services/moduleServices');
const sectionService = require('../../services/sectionServices');

//CREATE MODULE
const createModule = async (req, res) => {
    
    //var categorie = await Categorie.findById(req.params.idCategorie);
    //var formateur = await User.findById(req.params.idFormateur);
    let newModule = req.body;
    
    try{
        const savedModule = await moduleService.createModule(newModule);
        const section = await sectionService.updateSectionModuleById(req.params.sectionId, module.id);
        res.status(httpStatus.CREATED).send(module);
            console.log(savedModule)
            res.status(httpStatus.CREATED).json(savedModule);
        
    } catch(err){
        //console.log(savedUser);
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
    
};


module.exports = {
    createModule,
   
  };