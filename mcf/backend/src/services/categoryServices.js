const httpStatus = require('http-status');
const Category = require('../models/category');
const ApiError = require('../utils/ApiError');
const path = require("path");
const multer = require("multer");
const { async } = require('node-stream-zip');

const updateCategoryByformationId = async (categoryId, formationId) =>{
    const category = await Category.findById(categoryId);
    if(category.formations){
        category.formations.push(formationId);
    }
    else{
        category.formations = [formationId];
    }
    category.save();
    return category;
};

const deleteCategoryById = async (categoryId)=>{
    const category = await Category.findById(categoryId);
    console.log(categoryId);
    if(category){
        console.log("ENTERD FUNCTION+++++++++++");
        category.deletedAt=Date.now();
        console.log(category.id);
        console.log(category.deletedAt);
        category.save();
    }
    

    return category;
};

const getCountCategory = async() =>{
    const countCategory = await Category.countDocuments();
    return countCategory;
}

module.exports = {
    updateCategoryByformationId,
    deleteCategoryById,
    getCountCategory
}