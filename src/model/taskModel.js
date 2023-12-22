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
         ven_id:{ type: mongoose.Schema.Types.ObjectId,
            ref: "venderData"},price:{type:Number},send_Prod_date:{type:Date},Prod_desc:{
                type:String
            },ven_info:{
                type:Object
            },neg_price:{type:Number},
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "venderData",default:null
    }

},{timestamps:true});


const task = new mongoose.model('Task',taskSchema);
module.exports = task;