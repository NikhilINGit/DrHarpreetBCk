const Product = require("../model/productModel");
const response = require("../helper/responceHelper");
const TaskModel=require("../model/taskModel");
const task = require("../model/taskModel");
exports.allProducts = allProducts;
exports.createProduct = createProduct;
exports.deleteProduct = deleteProduct;
exports.buyProduct=buyProduct;
exports.deleteTask=deleteTask;
exports.getAllTask=getAllTask;
exports.TaskByUser=TaskByUser;
// four digit generate num function 
function generateRandomFourDigitNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}
async function getAllTask(req, res) {
  try {
    const getAllProduct = await task.find({softDelete:false});
    return response.userResponse(res, "All Products", getAllProduct);
  } catch (error) {
    console.log("error ", error);
    return response.negativeResponce(res, `error +${error}`, error);
  }
}
async function TaskByUser(req, res) {
  try {
    const getAllProduct = await task.find({softDelete:false,userReq:req.user._id});
    return response.userResponse(res, "All Products", getAllProduct);
  } catch (error) {
    console.log("error ", error);
    return response.negativeResponce(res, `error +${error}`, error);
  }
}
async function buyProduct(req,res){
  try {
    var { product_id ,quantity} = req.body;
    var ser_no= generateRandomFourDigitNumber();
    const tsknum=await TaskModel.find({ serial_no:ser_no,softDelete:false});
    const product = await Product.findById(product_id).select({price:1});
    const productPrice = product.price;
    const taskPrice=productPrice*quantity;
    var newTask= new TaskModel({});
      ser_no=ser_no+0.101;
      newTask.task_no=ser_no;
      newTask.price=taskPrice;
      newTask.quantity=quantity;
      newTask.userReq=req.user._id;
      newTask.productID=product_id;
      await newTask.save();
      response.userResponse(res, "Task Create", newTask);
  } catch (error) {
    response.negativeResponce(res, "error", {});
  }
}
// deleted task

async function deleteTask(req, res) {
  try {
    var { _id } = req.body;
    var deleteP = await task.findByIdAndDelete(_id);
    response.userResponse(res, "task are deleted", {});
  } catch (error) {
    console.log("error in delete task Function function ", error);
    response.negativeResponce(res, "error", {});
  }
}
async function deleteProduct(req, res) {
  try {
    var { _id } = req.body;
    var deleteP = await Product.findByIdAndDelete(_id);
    response.userResponse(res, "Product are deleted", {});
  } catch (error) {
    console.log("error in delete Product Function function ", error);
    response.negativeResponce(res, "error", {});
  }
}
async function createProduct(req, res) {
  try {
    var { productName, price } = req.body;
    var checkproduct = await Product.findOne({ productName: productName });

    if (checkproduct == null) {
      console.log("2====", checkproduct);
      var prodObj = new Product({});
      prodObj.productName = productName;
      prodObj.price = price;

      await prodObj.save();
      response.userResponse(res, "Product Created", prodObj);
    } else {
      console.log("666====", checkproduct);
      response.negativeResponce(res, "already created", {});
    }
  } catch (error) {
    console.log("error in product create function ", error);
    response.negativeResponce(res, "error", {});
  }
}

// async function createProduct(req, res) {
//   try {
//     var { productName, price } = req.body;
//     var checkproduct = await Product.findOne({ productName: productName });

//     if (checkproduct == null) {
//       var prodObj = new Product({});
//       prodObj.productName = productName;
//       prodObj.price = price;

//       await prodObj.save();
//       response.userResponse(res, "Product Created", prodObj);
//     } else {
//       response.errorResponse(res, "error", checkproduct);
//     }
//   } catch (error) {
//     console.log("error in product create function ", error);
//     response.errorResponse(res, "error", {});
//   }
// }

async function allProducts(req, res) {
  try {
    const getAllProduct = await Product.find({});
    return response.userResponse(res, "All Products", getAllProduct);
  } catch (error) {
    console.log("error ", error);
    return response.negativeResponce(res, `error +${error}`, error);
  }
}

