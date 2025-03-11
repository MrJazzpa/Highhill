const multer = require('multer');
const path = require('path');
const { isNull } = require('util');

var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads/audio/')
    },
   filename:(req,file,cb)=>{
           cb(null,Date.now()+path.extname(file.originalname));
       }
});

const Audio_upload = multer({
    storage:storage,
    limits:{fileSize:5* 1024 * 1024},
    fileFilter: (req,file, cb)=>{
        if(file.mimetype=="audio/mp4a-latm" || file.mimetype == "audio/mpeg"){
            cb(null,true);
        }else{
          
         const  error = cb(null, false);
             
             
        }
    }
})
//const upload = multer({storage:storage})

module.exports = Audio_upload;