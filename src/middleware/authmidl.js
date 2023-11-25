// var userModel=require('../model/userModel');
var userModel=require("../model/userModel")
var JWT=require('jsonwebtoken');
exports.authMidle=authMidle;
exports.adminacess=adminacess;
exports.expectAdminAccess=expectAdminAccess;
async function authMidle(req,res,next){
    try {    
    const decode = JWT.verify(req.headers.authorization,process.env.SECRATE_KEY);
    
    req.user=decode;
    
    next();
    } catch (error) {
        console.log("error are in authentication middleware ",error);
    }
}
//

async function adminacess(req,res,next){
    try {
        const decode = JWT.verify(req.headers.authorization,process.env.SECRATE_KEY);
    req.user=decode;
    // console.log('=====22==',req.user._id);
        const user=await userModel.findById(req.user._id);
        if(user.userType !== 1){
            return res.status(401).send({
                success:false,
                message:"Unauthorized User"
            });
        }else{
            next();
        }
    } catch (error) {
        res.status(401).send({
            success:false,
            error,
            message:"error are in admin middleware "
        })
    }
}
async function expectAdminAccess(req,res,next){
    try {
        const decode = JWT.verify(req.headers.authorization,process.env.SECRATE_KEY);
    req.user=decode;
        const user=await userModel.findById(req.user._id);
        if(user.userType !== 1){
           
            next();
        }else{
            return res.status(401).send({
                success:false,
                message:"Unauthorized User"
            });
        }
    } catch (error) {
        res.status(401).send({
            success:false,
            error,
            message:"error are in admin middleware "
        })
    }
}