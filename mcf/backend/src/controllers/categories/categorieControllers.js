const cryptoJS = require("crypto-js");
const Category = require('../../models/categorie');

//CREATE CATEGORY


exports.addNewCategory = async (req, res) => {
    
    let newCategory = new Category({
        designation : req.body.designation,
        creator: req.body.creator,
        description: req.body.description
    });
    
    try{
        const savedCategory = await newCategory.save();
            console.log(savedCategory)
            res.status(201).json(savedCategory);
        
    } catch(e){
        //console.log(savedUser);
        console.log(e);
        res.status(500).json(e);
    }
    
};

//Get Single category
exports.one = (req, res) =>{
    Category.findById(req.params.id, (err, obj) => {
        
        res.status(200).json(obj);
    });
    
};

//Delete category
exports.remove = (req, res) =>{
    Category.findByIdAndDelete(req.params.id, (err, obj) => {
        
        res.status(200).json(obj);
    });
    
};
//Update category
exports.edit = async(req, res) =>{
    try{
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true}
        );
        res.status(200).json(updatedCategory);
    } catch(err){
        res.status(500).json(err);
    }
    
};

//Get All categories
exports.all = (req, res) =>{
    Category.find({},(err, obj)  => {
        console.log(obj);
        res.status(200).json(obj);
    });
    
};