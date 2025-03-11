const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    content:{
       type:String,
       required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("Gallery",GallerySchema);