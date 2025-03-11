const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PrayerSchema = new Schema({
      name:{
            type:String,
            required:true
      },
      email:{
         type: String,
         required:true
      },
      phone:{
        type: String,
        required:true
     },
     prayer:{
        type: String,
        required:true
     },
     createdAt:{
         type:Date,
         default:Date.now()
     }
});

module.exports = mongoose.model('prayer',PrayerSchema);