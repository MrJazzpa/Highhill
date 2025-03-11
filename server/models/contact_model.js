const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContactSchema = new Schema({

       email:{
          type: String,
          required:true
       },
       phoneNumber:{
         type: String,
         required:true
       },
       address:{
           type: String,
           required:true
       },
       createAt:{
          type:Date,
          default:Date.now()
       }

});

module.exports = mongoose.model('Contact',ContactSchema);