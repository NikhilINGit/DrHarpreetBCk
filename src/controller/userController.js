const model=require("../model/userModel");
const response=require("../helper/responceHelper");
const JWT=require("jsonwebtoken");
const user = require("../model/userModel");
exports.register=register;
exports.login=login;
exports.reset=reset;
exports.deleted=deleted;
exports.getAllUser=getAllUser;
exports.convertInventry=convertInventry;
exports.allInventry=allInventry;
exports.convertQualityCheck=convertQualityCheck;
exports.convertAccount=convertAccount;
exports.convertGuard=convertGuard;
exports.allAccount=allAccount;
exports.allGuard=allGuard;
exports.allQualityCheck=allQualityCheck;
async function allQualityCheck(req,res){
    try {
        const QualityCheck = await model.find({userType:5});
        return response.userResponse(res,"AllUsers",QualityCheck);
    } catch (error) {
        console.log("error ",error);
        return response.negativeResponce(res,`error +${error}`, error); 
    }
}
async function allGuard(req,res){
    try {
        const getAllGuard = await model.find({userType:4});
        return response.userResponse(res,"AllUsers",getAllGuard);
    } catch (error) {
        console.log("error ",error);
        return response.negativeResponce(res,`error +${error}`, error); 
    }
}
async function allAccount(req,res){
    try {
        const accountUser = await model.find({userType:2});
        return response.userResponse(res,"AllUsers",accountUser);
    } catch (error) {
        console.log("error ",error);
        return response.negativeResponce(res,`error +${error}`, error); 
    }
}
async function allInventry(req,res){
    try {
        const getAllUsers = await model.find({userType:3});
        return response.userResponse(res,"AllUsers",getAllUsers);
    } catch (error) {
        console.log("error ",error);
        return response.negativeResponce(res,`error +${error}`, error); 
    }
}
async function  convertInventry (req,res){
    
    try {
        // var =req.body._id;
        var checkuser=await model.findByIdAndUpdate(req.body._id, { userType: 3 });
        response.userResponse(res, "user updated",checkuser);
    } catch (error) {
        console.log("error in covert invenrty function ",error);
        response.negativeResponce(res, "error", {});  
    }
}
async function  convertGuard (req,res){
    
    try {
        // var =req.body._id;
        var checkuser=await model.findByIdAndUpdate(req.body._id, { userType: 4 });
        response.userResponse(res, "user updated",checkuser);
    } catch (error) {
        console.log("error in covert invenrty function ",error);
        response.negativeResponce(res, "error", {});  
    }
}
async function  convertAccount (req,res){
    
    try {
        // var =req.body._id;
        var checkuser=await model.findByIdAndUpdate(req.body._id, { userType: 2 });
        response.userResponse(res, "user updated",checkuser);
    } catch (error) {
        console.log("error in covert invenrty function ",error);
        response.negativeResponce(res, "error", {});  
    }
}
async function  convertQualityCheck (req,res){
    
    try {
        // var =req.body._id;
        var checkuser=await model.findByIdAndUpdate(req.body._id, { userType: 5 });
        response.userResponse(res, "user updated",checkuser);
    } catch (error) {
        console.log("error in covert invenrty function ",error);
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

async function deleted(req, res) {
  try {
    await model.findByIdAndDelete(req.body.id);
    // var allUsers=model.find({});
    response.userResponse(res, "user forgoted", {});
  } catch (error) {
    console.log("error in delete function ", error);
    response.negativeResponce(res, "error", {});
  }
}

async function reset(req,res){
    console.log("funtion ")
    try {
        var {password}=req.body;
        var checkuser=await model.findByIdAndUpdate(req.params.id, { password: password });
        response.userResponse(res, "user forgoted",checkuser);
    } catch (error) {
        console.log("error in forgot function ",error);
        response.negativeResponce(res, "error", {});  
    }
}

async function login(req, res) {
  try {
    var { email, password } = req.body;
    var checkuser={};
     checkuser.user = await model.findOne({ email: email });
    if (!checkuser) {
      response.userResponse(res, "no user find", {});
    } else if (checkuser.user.password == password) {
      const token = await JWT.sign({ _id: checkuser._id }, process.env.SECRATE_KEY, {
        expiresIn: "1d",
      });
      
      checkuser.token=token;
      
      // console.log("=====checkUser  token are  ",checkuser.token,"====",checkuser.user);
      response.userResponse(res, "user logined", checkuser);
    } else {
      response.userResponse(res, "Incorrect password", {});
    }
  } catch (error) {
    console.log("error in register function ", error);
    response.negativeResponce(res, "error", {});
  }
}

async function register(req, res) {
  try {
    var { email, password, userName } = req.body;
    var checkuser = await model.findOne({ email: email });
    if (checkuser == null) {
      var userObj = new model({});
      userObj.email = email;
      userObj.password = password;
      // userObj.userType=2;
      userObj.userName = userName;
      await userObj.save();
      response.userResponse(res, "user are registered", userObj);
    } else {
      response.negativeResponce(res, "error", checkuser);
    }
  } catch (error) {
    console.log("error in register function ", error);
    response.negativeResponce(res, "error", {});
  }
}
