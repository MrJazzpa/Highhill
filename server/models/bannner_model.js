const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BannerSchema = new Schema({
    name:{
        type: String,
        required: true
     },
    contentType:{
        type:String,
        required:true
    },
     createdAt:{
        type: Date,
        default:Date.now()
     }
})

module.exports = mongoose.model("Banner",BannerSchema);