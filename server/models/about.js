const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AboutSchema = new Schema({
    heading:{
         type:String,
         required:true
    },
    about:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("About",AboutSchema);