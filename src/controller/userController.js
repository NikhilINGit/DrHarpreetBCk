const model=require("../model/userModel");
var mongoose=require("mongoose")
var ObjectId = mongoose.Types.ObjectId;
const response=require("../helper/responceHelper");

exports.register=register;
exports.login=login;
exports.reset=reset;
exports.deleted=deleted;
exports.getAllUser=getAllUser;
exports.convertInventry=convertInventry;
exports.allInventry=allInventry;
async function allInventry(req,res){
    try {
        const getAllUsers = await model.find({userType:3});
        return response.userResponse(res,"AllUsers",getAllUsers);
    } catch (error) {
        console.log("error ",error);
        return response.negativeResponce(res,`error +${error}`, error); 
    }
}
async function convertInventry(req,res){
    try {       
        var checkuser=await model.findByIdAndUpdate(req.body._id, { userType: 3 });
        console.log("======",checkuser);
        response.userResponse(res, "user are inventry",checkuser);
    } catch (error) {
        console.log("error in convert inventry  function ",error);
        response.negativeResponce(res, "error", {});  
    }
}
async function getAllUser(req,res){
    try {
        const getAllUsers = await model.find({});
        return response.userResponse(res,"AllUsers",getAllUsers);
    } catch (error) {
        console.log("error ",error);
        return response.negativeResponce(res,`error +${error}`, error); 
    }
}

async function deleted(req,res){
 try {
    await model.findByIdAndDelete(req.params.id);
    // var allUsers=model.find({});
    response.userResponse(res, "user forgoted",{});
 } catch (error) {
    console.log("error in delete function ",error);
        response.negativeResponce(res, "error", {});  
 }
}

async function reset(req,res){
    // console.log("funtion ")
    try {
        var {password}=req.body;
        var checkuser=await model.findByIdAndUpdate(req.params.id, { password: password });
        response.userResponse(res, "user forgoted",checkuser);
    } catch (error) {
        console.log("error in forgot function ",error);
        response.negativeResponce(res, "error", {});  
    }
}

async function login(req,res){
    try {
        var {email,password}=req.body;
        var checkuser= await model.findOne({email:email});
        if(!checkuser){
            response.negativeResponce(res, "no user find", {});   
        }else if(checkuser.password==password){
            response.userResponse(res, "user logined", checkuser);
        }else{
            response.negativeResponce(res, "Incorrect password", {});
        }
    } catch (error) {
        console.log("error in register function ",error);
        response.negativeResponce(res, "error", {});
    }
}

async function register(req,res){
    
    try {
        var {email,password,userName}=req.body;
     
        var checkuser= await model.findOne({email:email});
   
        if(checkuser==null){
            var userObj= new model({});
            userObj.email=email;
            userObj.password=password;
            userObj.userName=userName;
            // userObj.userType=2;
            await userObj.save();
            response.userResponse(res, "user are registered", userObj);
        }else{
            
            response.negativeResponce(res, "Already register ", {});
            // response.errorResponse(res, "VALIDATION_ERROR_KEY", checkuser);
        }
    } catch (error) {
        console.log("error in register function ",error);
        response.negativeResponce(res, "error", {});
    }
}
