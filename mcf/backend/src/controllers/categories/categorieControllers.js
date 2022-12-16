
const Category = require('../../models/category');
const categoryService = require('../../services/categoryServices');

//CREATE CATEGORY
exports.addNewCategory = async (req, res) => {
    
    let newCategory = new Category({
        title : req.headers.title,
        image: req.file? "/data/uploads/" + req.file.filename : "/data/uploads/mcf.png"
    });
    console.log(newCategory)
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
exports.one = async (req, res) =>{
    const category = await Category.findById(req.params.id)
        .populate({path: 'formations', populate: {path: 'sections', populate: {path: 'modules'}}})
        .populate({path: 'formations', populate: {path: 'assignments', populate: {path: 'userId'}}})
        .populate({path: 'formations', populate: {path: 'teacher'}});

        res.status(200).json(category);
    
};

//Delete category
exports.remove = async (req, res) =>{
    console.log(req.params.categoryId)
    try{
        const category = await categoryService.deleteCategoryById(req.params.categoryId);
        res.status(200).json({"message":"Category deleted successfully!!!"});
    }
    catch(err){
        res.status(500).json({"message" : "deleting failed!"});
    }
    
    
};
//Update category
exports.updateCategory = async(req, res) =>{
    try{
        console.log(req.body);
        console.log(req.params.id);
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true}
        );
        console.log(updatedCategory);
        res.status(200).json({"message":"category updated"});
    } catch(err){
        res.status(500).json(err);
    }
    
};

//Get All categories
exports.getCategories = async (req, res) =>{
    const categories = await Category.find({deletedAt:null})
        .populate({path: 'formations', populate: {path: 'sections', populate: {path: 'modules'}}})
        .populate({path: 'formations', populate: {path: 'assignments', populate: {path: 'userId'}}})
        .populate({path: 'formations', populate: {path: 'teacher'}});
    res.status(200).json(categories);
    
};
