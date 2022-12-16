const Message = require('../models/forums');

//Create message in forum
const createMessageByUserId = async (user, message) =>{
    console.log(user);
    console.log(message);
    return Message.create({user, message});
}

//Get message in forum
const getMessageAll = async () =>{
    const messages = await Message.find({deletedAt:null})
    .populate({ path: 'user'});
    return messages;
}

module.exports ={
    createMessageByUserId,
    getMessageAll
}