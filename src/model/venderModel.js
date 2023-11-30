const mongoose = require("mongoose");
const connection = require("../../config/connection");
const venderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    venderName: {
      type: String,
    },
    products: [
      {
        name: { type: String },
        price: { type: Number },
        description: {
          type: String,
        },
      },
    ],softDelete:{
        type:Boolean,default:false
      },
  },
  { timestamps: true }
);

const vender = new mongoose.model("venderData", venderSchema);
module.exports = vender;
