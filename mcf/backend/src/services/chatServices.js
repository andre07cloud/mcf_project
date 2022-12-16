
const Chat = require('../models/chat');

//Send message by student and admin each other
const createChatMessage = async (student, teacher, senderId, message) =>{
    return Chat.create({student, teacher, senderId, message});
};

//Get message Chat from student and teacher
const getMessageByStudentAndTeacher = async (studentId, teacherId) =>{
    console.log("student Id: "+studentId);
    console.log("teacher Id: "+teacherId);
    const messages = await Chat.find({deletedAt:null})
        .populate({path: 'student'})
        .populate({path: 'teacher'});
        console.log("Messages...: "+messages)
        let currentUserMessage = [];
        messages.map((item) => {
            console.log("student Id: "+studentId);
            console.log("teacher Id: "+teacherId);
            console.log(item.student.id);
            if(item.student.id == studentId && item.teacher.id == teacherId){
                
                console.log(item.teacher);
                currentUserMessage.push(item);
                console.log(currentUserMessage);
            }
        });
        return currentUserMessage;
}

module.exports = {
    createChatMessage,
    getMessageByStudentAndTeacher
}