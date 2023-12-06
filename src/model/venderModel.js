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
        name: { type: String },
      },
    ],softDelete:{
        type:Boolean,default:false
      },otp:{
type:String
      },completeinfo:{
        type:Boolean,default:false
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
