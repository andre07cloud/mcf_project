const mongoose = require('mongoose');
const upload = require('../../middleware/upload');
const dotenv = require("dotenv").config();
const Grid = require("gridfs-stream");


exports.uploadFile = (req, res) =>{
    if(req.file === undefined){
        return res.status(500).json("You most select a file.");;
    }
    const imgUrl = `${process.env.IMG_URL}/${req.file.filename}`;
    return res.status(200).json({"message": imgUrl});
}

let gfs;

const conn = mongoose.connection;
conn.once("open", function(){
    console.log("********Connected !!!!!");
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
});

exports.getOnfile = async(req, res) => {
    try {

        const file = await gfs.files.findOne({filename:req.params.filename});
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
        
    } catch (error) {
        res.send("not found");
    }
}
