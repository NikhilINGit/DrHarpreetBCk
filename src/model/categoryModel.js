const mongoose = require("mongoose");
const connection = require("../../config/connection");
const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
    },
    Desciption: {
      type: String,
      default: "product Description",
    },createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }
  },
  { timestamps: true }
);
const category = new mongoose.model("catery", categorySchema);
module.exports = category;
