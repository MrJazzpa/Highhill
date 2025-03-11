const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const HomeSchema = new Schema({
     header:{
          type:String,
          required: true
     },
     welcome_txt:{
        type: String,
        required: true
     },
     
     createdAt:{
        type: Date,
        default:Date.now()
     }

});

module.exports = mongoose.model("Home",HomeSchema);
