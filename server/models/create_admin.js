const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdminSchema = new Schema({

    username:{
          type:String,
          required:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

});

module.exports = mongoose.model("Admin",AdminSchema);