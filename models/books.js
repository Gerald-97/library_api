const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema ({
    Title:String,
    Author:{type:String, required:true},
    Url:{type:String},
    Description:{type:String},
    Published:{type:Number},
    Created_at: { type: Date, default: Date.now }
    
})

 

module.exports = mongoose.model("Book", bookSchema);