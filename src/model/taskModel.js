const mongoose=require("mongoose");
// var jwt=require('jsonwebtoken');
const connection=require('../../config/connection');
const taskSchema = new mongoose.Schema({
    
    serial_no:{
type:Number
    },apllied:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    
    productID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    },price:{
        type:Number,
        default:2
    },quantity:{
        type:String
    },softDelete:{
        type:Boolean,
        default:false
    }

},{timestamps:true});


const task = new mongoose.model('Task',taskSchema);
module.exports = task;