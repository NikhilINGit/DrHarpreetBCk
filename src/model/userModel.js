const mongoose=require("mongoose");
var jwt=require('jsonwebtoken');
const connection=require('../../config/connection');
const userSchema = new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },userType:{
        type:Number,
        default:null
    },userName:{
        type:String
    }

},{timestamps:true});
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.SECRATE_KEY);
  };

const user = new mongoose.model('user',userSchema);
module.exports = user;