
const actualityService = require('../../services/actualityServices');

const createActuality = async (req, res) =>{
    const actuality = await actualityService.createActualite(req.body);
    res.status(201).json(actuality);
};

const getActualities = async (req, res) => {
    const actualities = await actualityService.getActualities();
    res.status(200).json(actualities);
};

const getActuality = async (req, res) => {
    const actuality = actualityService.getActualityById(req.params.actualityId);
    res.status(200).json(actuality);
}

module.exports ={
    createActuality,
    getActualities,
    getActuality
}