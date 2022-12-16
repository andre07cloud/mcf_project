
const { log } = require('console');
const fs = require('fs');
const multer = require("multer");


const uploadFile = async(req, res, next)  => {

  try{
          
      console.log(req.body)
      var data =req.body.file;
      var ex=req.body.ex;
      var name=req.body.name;
      console.log('FIRST=====> '+data);
      console.log('FIRST=======> '+name);
      console.log('FIRST=================> '+ex);
      
// var newHeader = 'Y2l2aWxpdGUsbGFzdE5hbWUsZmlyc3ROYW1lLGFkcmVzc2UsY29kZV9wb3N0YWwsdmlsbGUsZGF0ZV9uYWlzc2FuY2UscGhvbmUsZW1haWwK'
// data= newHeader + data.substring(96);
   
      if( ex=='jpg' || ex =='png' || ex== 'jpeg' || ex== 'pdf' || ex== 'mp4'){
          console.log('IMAGE');
          var buff = new Buffer.from(data,'base64');
          fs.writeFile('./public/data/uploads/'+name,buff, {encoding: 'base64'}, function (err) {
          if (err) return console.log(err);
      console.log('=======>'+name);
      console.log('=================>'+ex);
      res.status(404).json({msg:'image ou doc ou video bien recu'})
              
      });

  }
 // res.status(404).json({msg:'Contacts du csv enregistes avec succes'});
    //console.log('freed', allocator.free(offset), 'bytes');
    Buffer.alloc();
    next();
      
 } catch(err){
      res.status(500).json(err);
  }
}

//////////////////////////////



function uploadMiddle() {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/data/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
      
    },
  });
  
  const upload = multer({ storage: storage });
  return upload;
  
}
function uploadScormMiddle() {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "/upload");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
      
    },
  });
  
  const upload = multer({ storage: storage });
  return upload;
  
}


module.exports ={
  uploadFile,
  uploadMiddle,
  uploadScormMiddle
  
}