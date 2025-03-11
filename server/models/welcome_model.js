const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WelcomeSchema = new Schema({
    heading:{
         type:String,
         required:true
    },
    welcome_text:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("WelcomeNote",WelcomeSchema);