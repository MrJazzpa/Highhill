const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    book_name:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports= mongoose.model('Books',bookSchema);