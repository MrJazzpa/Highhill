const  mongoose  = require("mongoose");
const Schema = mongoose.Schema;
audioSchema = new Schema({
     heading:{
        type:String,
        require:true

     },
     audio_file:{
        type: String,
        require:true,

     },
     cover_photo:{
          type:String,
          required:false
     },
     createdAt:{
          type:Date,
          default:Date.now()
     }
})

module.exports = mongoose.model('Audio_Sermon',audioSchema);