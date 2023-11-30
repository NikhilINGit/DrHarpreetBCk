const mongoose=require("mongoose");
// var jwt=require('jsonwebtoken');
const connection=require('../../config/connection');
const productSchema = new mongoose.Schema({
    productName:{
        type:String
    },
 
        price:{
            type:Number,
        default:2
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "catery",
    },createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }
},{timestamps:true});
// userSchema.methods.getJWTToken = function () {
//     return jwt.sign({ id: this._id }, process.env.SECRATE_KEY);
//   };

const product = new mongoose.model('product',productSchema);
module.exports = product;