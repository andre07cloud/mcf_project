
const Actualityj = require('../models/actualites');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');


const createActualite = async(actualityBody) =>{
    const actualite = await Actuality.create(actualityBody);
    return actualite;
};

const getActualities = async() =>{
    const actualities = await Actuality.find();
    return actualities;
};

const getActualityById = async (actualityId) =>{
    const actuality = await Actuality.findById(actualityId);
    return actuality;
}

const updateActualityById = async(actualityId, actualityBody) =>{
    try{
        const actuality = await Actuality.findByIdAndUpdate(
            actualityId, 
            {
                $set: actualityBody,
            },
            { new: true}
            );
            return actuality;
    }
    catch(err){
        throw new ApiError(httpStatus.NOT_FOUND, err);
    }
    
};

const deleteActualityById = async (actualityId) =>{
    const actuality = await Actuality.findByIdAndUpdate(
        {_id: actualityId},
        {
            $addToSet: {deletedAt: Date.now()}
        }
    );
    return actuality;
 }


module.exports ={
    createActualite,
    getActualities,
    getActualityById,
    updateActualityById,
    deleteActualityById
}