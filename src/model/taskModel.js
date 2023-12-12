const mongoose=require("mongoose");
// var jwt=require('jsonwebtoken');
const connection=require('../../config/connection');
const taskSchema = new mongoose.Schema({
    
    task_no:{
type:Number
    },userReq:{
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
        type:Number
    },softDelete:{
        type:Boolean,
        default:false
    },approvedByAdmin:{
        type:Boolean,default:false
    },venders: [
        {
          // name: { type: String },
          type: mongoose.Schema.Types.ObjectId,
        ref: "venderData"
        },
      ],approvedByQualityChaker:{
        type:Boolean,default:false
    },approvedByGuird:{
        type:Boolean,default:false
    },description:{
        type:String
    }
    ,approvedByAccount:{
        type:Boolean,default:false
    },selectedVender:{
        type:String
    }

},{timestamps:true});


const task = new mongoose.model('Task',taskSchema);
module.exports = task;