const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({
    storage:storage,
    limits:{fileSize:1* 1024 * 1024},
    fileFilter: (req,file, cb)=>{
        if(file.mimetype.startsWith('image/')){
            cb(null,true);
        }else{
         
           cb(null, false);
             
             
        }
    }

})
module.exports = upload;