
const chatService = require('../../services/chatServices');
const emailService = require('../../services/emailServices');


const createChatMessage = async (req, res) =>{
    const {studentId, teacherId, senderId, message} = req.body;
    try{
        const messageSaved = await chatService.createChatMessage(studentId, teacherId, senderId, message);
        res.status(200).json({"message": "message sent successfully!!!"});
    }
    catch(err){
        res.status(500).json({"message" : "error occured sending message"});
    }
}

const getUserMessages = async (req, res) => {

    try{
        const messages = await chatService.getMessageByStudentAndTeacher(req.params.studentId, req.params.teacherId);
        res.status(200).json(messages);
    }
    catch(err){
        res.status(500).json({"message" : "chat not found!!!"});
    }
}

const sendMail = async (req, res) => {
    const {senderId, receiverId, subject, emailBody} = req.body;
    try{
        const email = await emailService.sendMailToUser(senderId, receiverId, subject, emailBody);
        res.status(200).json({"message" : email});
    }
    catch(err){
        res.status(500).json({"message" : "error encountered"});
    }
}

module.exports = {
    createChatMessage,
    getUserMessages,
    sendMail
}