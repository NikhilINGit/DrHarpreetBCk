const Product = require("../model/productModel");
const response = require("../helper/responceHelper");
const TaskModel=require("../model/taskModel");
const task = require("../model/taskModel");
const venders=require("../model/venderModel");
const vender = require("../model/venderModel");
const category=require("../model/categoryModel");
exports.allProducts = allProducts;
exports.createProduct = createProduct;
exports.deleteProduct = deleteProduct;
exports.buyProduct=buyProduct;
exports.deleteTask=deleteTask;
exports.getAllTask=getAllTask;
exports.TaskByUser=TaskByUser;
exports.taskApproved=taskApproved;
exports.getTaskAccount=getTaskAccount;
exports.getTaskGuard=getTaskGuard;
exports.getTaskQuality=getTaskQuality;
exports.qualityTaskApproved=qualityTaskApproved;
exports.guardTaskApproved=guardTaskApproved;
exports.accountTaskApproved=accountTaskApproved;
exports.venderCreate=venderCreate;
exports.allVenderData=allVenderData;
exports.categoryCreated=categoryCreated;
exports.allCategory=allCategory;
// four digit generate num function 
function generateRandomFourDigitNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}
async function getAllTask(req, res) {
  try {
    const getAllProduct = await task.find({softDelete:false}).populate({
      path:'productID',
      select:{"productName":1},
  });
    return response.userResponse(res, "All Products", getAllProduct);
  } catch (error) {
    console.log("error ", error);
    return response.negativeResponce(res, `error +${error}`, error);
  }
}
async function allCategory(req, res) {
  try {
    const getAllCategory = await category.find();
    return response.userResponse(res, "All Category", getAllCategory);
  } catch (error) {
    console.log("error ", error);
    return response.negativeResponce(res, `error +${error}`, error);
  }
}
async function allVenderData(req, res) {
  try {
    const getAllVender = await venders.find({softDelete:false});
    return response.userResponse(res, "All vender", getAllVender);
  } catch (error) {
    console.log("error ", error);
    return response.negativeResponce(res, `error +${error}`, error);
  }
}
async function categoryCreated(req, res) {
  try {
    var { categoryName, Desciption } = req.body;
    var checkCategory = await category.findOne({ categoryName: categoryName });
    if (checkCategory == null) {
      var catObj = new category({});
      catObj.categoryName = categoryName;
      catObj.Desciption = Desciption;
      catObj.createdBy=req.user._id;
      await catObj.save();
      response.userResponse(res, "Category Created", catObj);
    } else {
      console.log("already category===", checkCategory);
      response.negativeResponce(res, "already category created ", {});
    }
  } catch (error) {
    console.log("error in category create function ", error);
    response.negativeResponce(res, "error", {});
  }
}
async function venderCreate(req, res) {
  try {
    var { email, venderName,products } = req.body;
    var checkVender = await venders.findOne({ email: email });

    if (checkVender == null) {
      // console.log("2====", checkproduct);
      var venderObj = new vender({});
      venderObj.venderName = venderName;
      venderObj.email = email;
      venderObj.products=products;
      await venderObj.save();
      response.userResponse(res, "vender Created", venderObj);
    } else {
      console.log("666====", checkVender);
      response.negativeResponce(res, "already vender rigester with this email", {});
    }
  } catch (error) {
    console.log("error in vender create function ", error);
    response.negativeResponce(res, "error", {});
  }
}
async function accountTaskApproved(req, res) {
  try {
    var { _id } = req.body;
    var approved = await task.findByIdAndUpdate(_id, { approvedByAccount: true });;
    response.userResponse(res, "aapproved by Account", approved);
  } catch (error) {
    console.log("error in approved functionalityFunction function ", error);
    response.negativeResponce(res, "error", {});
  }
}
async function guardTaskApproved(req, res) {
  try {
    var { _id } = req.body;
    var approved = await task.findByIdAndUpdate(_id, { approvedByGuird: true });;
    response.userResponse(res, "aapproved by byQuality", approved);
  } catch (error) {
    console.log("error in approved functionalityFunction function ", error);
    response.negativeResponce(res, "error", {});
  }
}
async function qualityTaskApproved(req, res) {
  try {
    var { _id } = req.body;
    var approved = await task.findByIdAndUpdate(_id, { approvedByQualityChaker: true });;
    response.userResponse(res, "aapproved by byQuality", approved);
  } catch (error) {
    console.log("error in approved functionalityFunction function ", error);
    response.negativeResponce(res, "error", {});
  }
}
async function getTaskGuard(req, res) {
  try {
    const getAllTask = await task.find({softDelete:false,approvedByAdmin: true,approvedByAccount:true}).populate({
      path:'productID',
      select:{"productName":1},
  });
    return response.userResponse(res, "All Products", getAllTask);
  } catch (error) {
    console.log("error ", error);
    return response.negativeResponce(res, `error +${error}`, error);
  }
}
async function getTaskQuality(req, res) {
  try {
    const getAllTask = await task.find({softDelete:false,approvedByAdmin: true,approvedByAccount:true}).populate({
      path:'productID',
      select:{"productName":1},
  });
    return response.userResponse(res, "All Products", getAllTask);
  } catch (error) {
    console.log("error ", error);
    return response.negativeResponce(res, `error +${error}`, error);
  }
}
async function getTaskAccount(req, res) {
  try {
    const getAllTask = await task.find({softDelete:false,approvedByAdmin: true}).populate({
      path:'productID',
      select:{"productName":1},
  });
    return response.userResponse(res, "All Products", getAllTask);
  } catch (error) {
    console.log("error ", error);
    return response.negativeResponce(res, `error +${error}`, error);
  }
}
async function taskApproved(req, res) {
  try {
    var { _id } = req.body;
    var approved = await task.findByIdAndUpdate(_id, { approvedByAdmin: true });;
    response.userResponse(res, "aapproved by admin", approved);
  } catch (error) {
    console.log("error in approved functionalityFunction function ", error);
    response.negativeResponce(res, "error", {});
  }
}
async function TaskByUser(req, res) {
  try {
    const getAllProduct = await task.find({softDelete:false,userReq:req.user._id}).populate({
      path:'productID',
      select:{"productName":1},
  });
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
    var { productName, price ,category} = req.body;
    var checkproduct = await Product.findOne({ productName: productName });

    if (checkproduct == null) {
      console.log("2====", checkproduct);
      var prodObj = new Product({});
      prodObj.productName = productName;
      prodObj.price = price;
      prodObj.category = category;
      prodObj.createdBy=req.user._id;
      await prodObj.save();
      response.userResponse(res, "Product Created", prodObj);
    } else {
      console.log("===", checkproduct);
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

