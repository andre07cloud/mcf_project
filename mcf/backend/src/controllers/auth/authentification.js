const User = require("../../models/users");
const cryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
//LOGIN WITH JWT


exports.login = async (req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email });
        
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
                    isAdmin: user.isAdmin,
                },
                process.env.JWT_SEC,
                {expiresIn: "3d"},
        );
            
        user.active = true;
        await user.save();
        res.status(200).json({user, accessToken});
        console.log("LOGIN SUCCESSFULY!");
    }catch(e){
        res.status(500).json(e);
        console.log(e);

    }
}

