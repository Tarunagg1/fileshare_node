const mongoose = require('mongoose')

const fileschema = new  mongoose.Schema({
     filename:{
         type:String,
         required:true
     },
     path:{
         type:String,
         required:true
     },
     size:{
         type:Number,
         required:true
     },
     uuid:{
         type:String,
         required:true
     },
     sender:{
         type:String,
         required:false
     },
     reciver:{
         type:String,
         required:false
     },
},{timestamps:true})



const filemodel = mongoose.model('fileshare',fileschema);

module.exports = filemodel;

