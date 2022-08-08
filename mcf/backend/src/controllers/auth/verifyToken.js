const jwt = require('jsonwebtoken');



function verifyToken (req, res, next) {
    console.log("ECHEC!");
    const authHeader = req.headers.token;
    if(authHeader){
       const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if(err) res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        });
    } else {
        console.log("You are not authenticated!");
        return res.status(401).json("You are not authenticated!");
    }
};


exports.verifyTokenAndAuthorization = (req, res, next) =>{
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id && req.user.isAdmin){
            //console.log(req.user.isAdmin);
            next();
        } else {
            console.log("You are not alowed to do that!");
            res.status(403).json("You are not alowed to do that!");
        }
    });
};


exports.verifyTokenAndAdmin = (req, res, next) =>{
    console.log("***TOKEN **************");
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            
            next();
        } else {
            console.log("You are not alowed to do that!");
            res.status(403).json("You are not alowed to do that!");
        }
    });
};

exports.connected = (req, res, next) =>{
    console.log("ECHEC!");
    const authHeader = req.headers.token;
    if(authHeader){
       const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if(err) res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        });
    } else {
        console.log("You are not connected on platform!");
        return res.status(401).json("You are not connected on platform!");
    }
};


