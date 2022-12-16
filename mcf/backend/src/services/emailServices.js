let nodemailer = require('nodemailer');
const User = require('../models/users');
const dotenv = require("dotenv").config();

const sendMailToUser = async (senderId, receiverId, subject, emailBody) =>{
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.ADMIN_MAIL,
            pass: process.env.APP_PASS
        }
    });
    
    let mailOptions = {
        from: process.env.ADMIN_MAIL,
        to: receiver.email,
        subject: subject,
        //text: emailBody
        html: `<h4>Bonjour ${receiver.firstName},</h4></br><h5>${sender.firstName} vous a écrit dépuis la plateforme MCF et repond à l'adresse suivante: ${sender.email} </h5><p>--------------------------------------------------------------------------------------------------</p><p>${emailBody}</p>`
    };
    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log(error);
        }
        else{
            console.log("Email sent: "+info.response);
            return info;
        }
    });
    
}


module.exports ={
    sendMailToUser
}

