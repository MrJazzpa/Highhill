const path = require('path');
const multer = require('multer');
const book_model = require('../models/book_model');

var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads/books/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname));
    }
});

const Books_upload = multer({
    storage:storage,
    limits:{fileSize:8* 1024 * 1024},
    fileFilter: (req,file, cb)=>{
        if(file.mimetype=="application/pdf" ){
            cb(null,true);
        }else{
          
         const  error = cb(null, false);
             
             
        }
    }

})

module.exports = Books_upload;