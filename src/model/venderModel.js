const mongoose = require("mongoose");
const connection = require("../../config/connection");
const venderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    venderName: {
      type: String,
    },createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    category: [
      {
        // name: { type: String },
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "catery"
      },
    ],softDelete:{
        type:Boolean,default:false
      },otp:{
        type:Number
      },completeinfo:{
        type:String,default:false
      },address:{
        type:String
      },phoneNum:{
        type:Number
      }
  },
  { timestamps: true }
);

const vender = new mongoose.model("venderData", venderSchema);
module.exports = vender;
