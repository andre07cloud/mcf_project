
const forumService = require('../../services/forumServices');

//Create forum message
const createMessage = async (req, res) => {
  const  user = req.body.userId;
  const message = req.body.message;
  try{
        console.log("INSIDE");
        console.log(user);
        console.log(message);
        const savedMessage = await forumService.createMessageByUserId(user, message);
        res.status(200).json({"message": "message saved successfully!!!"});
  }
  catch(error){
        res.status(500).json({"message":"Internal server error!!!"})
  }
    
}

//Get all forum message
const getMessages = async (req, res) =>{

    try{
        const messages = await forumService.getMessageAll();
        res.status(200).json(messages);
    }
    catch(err){
        res.status(500).json({"message": err});
    }
}

module.exports = {
    createMessage,
    getMessages
}