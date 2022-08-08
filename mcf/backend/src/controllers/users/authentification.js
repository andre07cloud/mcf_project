const model = require("../../models/users");
const cryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const Role = require('../../models/roles');
//LOGIN WITH JWT

exports.login = async (req, res) => {
    
        const user = await model.User.findOne({ email: req.body.email });
        
        if(!user){
            console.log("Bad mail!");
            return res.status(401).json({"message":"Wrong credentials!"});
            
        }
        
        else{
            const hashedPassword = cryptoJS.AES.decrypt(
                user.password,
                process.env.PASS_SEC
            );
            const password = hashedPassword.toString(cryptoJS.enc.Utf8);
            if(password !== req.body.password){
                console.log("Bad Password!");
                return res.status(401).json({"message":"Wrong credentials!"});
                    
        
                }
        }
        
        
            const accessToken = jwt.sign(
                {
                    id:user._id,
                    role:user.role,
                    isAdmin: user.isAdmin,
                },
                process.env.JWT_SEC,
                {expiresIn: "3d"},
            );
        user.token = accessToken.toString(); 
        
        res.status(200).json({user});
        console.log("LOGIN SUCCESSFULY!");

    
        
}

