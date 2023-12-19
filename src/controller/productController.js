const Product = require("../model/productModel");
const response = require("../helper/responceHelper");
const TaskModel=require("../model/taskModel");
const task = require("../model/taskModel");
// const venders=require("../model/venderModel");
const vender = require("../model/venderModel");
const category=require("../model/categoryModel");
const mailhelper = require("../helper/mailsendHelper");
// const vender = require("../model/venderModel");
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
exports.categoryCreated=categoryCreated;
exports.allCategory=allCategory;
exports.productByCategory=productByCategory;
exports.getEmail=getEmail;
exports.postFormData=postFormData;
exports.getAllVender=getAllVender;
exports.deleteVender=deleteVender;
exports.VenderProductAccess=VenderProductAccess;
exports.allvendersbytask=allvendersbytask;
exports.getAllVenderByCategory=getAllVenderByCategory;
exports.buyProductPerticularvender=buyProductPerticularvender;
// four digit generate num function 
 async function generateUniqueSerialNumber() {
//   let ser_no;
//   do {
//     ser_no = generateRandomFourDigitNumber();
//     console.log("333 function call : ",ser_no)
//   } while (TaskModel.exists({ serial_no: ser_no, softDelete: false }));
//   return ser_no;
// }
const maxAttempts = 100; // Maximumerial number yo loop 100 bar chalahg abss

  for (let i = 0; i < maxAttempts; i++) {
    let ser_no = generateRandomFourDigitNumber();
    const existingTask = await TaskModel.findOne({ task_no: ser_no, softDelete: false });
    if (!existingTask) {
      return ser_no;
    }
  }
  return 100;
}
function generateRandomFourDigitNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}
// function generateRandomFourDigitNumber() {
//   return Math.floor(1000 + Math.random() * 9000);
// }
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
async function getEmail(req,res){
  try {
    const email=req.body.email;
    const checkvender = await vender.findOne({email:email});
    if (checkvender){
      if(checkvender.completeinfo===true){
        return response.negativeResponce(res, `already vender created with this email`, vender);
      }else{
        return response.negativeResponce(res, `already mail send`, vender);
      }
    }else{
      var fourDigitCode=generateRandomFourDigitNumber();
          var venderObj=new vender({});
          venderObj.email=email;
          venderObj.createdBy=req.user._id;
          venderObj.otp=fourDigitCode;
          await venderObj.save();
           mailhelper.venderRegistration(email,fourDigitCode);
          response.userResponse(res, " email store & form are send to vender", venderObj);
    }
  } catch (error) {
    console.log("error ", error);
    return response.negativeResponce(res, `error +${error}`, error);
  }
}
async function postFormData(req,res){
  try {
    var{email,venderName,category,val,completeinfo,address,phoneNum}=req.body;
    var venderObj=await vender.findOne({email:email});
    if(venderObj){
      if(venderObj.otp==val){
        venderObj.email=email;
        venderObj.venderName=venderName;
        venderObj.category=category;
        venderObj.otp=null;
        venderObj.address=address;
        venderObj.phoneNum=phoneNum;
        venderObj.completeinfo=completeinfo;
        await venderObj.save();
        response.userResponse(res, " vender are created", venderObj);
      }else{
        return response.negativeResponce(res, `already vender register plz reconnect to company`, {});
      }
    }else{
      return response.negativeResponce(res, `plz provide same vender email`, {});
    }
  } catch (error) {
    console.log("error ", error);
    return response.negativeResponce(res, `error +${error}`, error)
  }
}
async function productByCategory(req, res) {
  try {
    const getAllProduct = await Product.find({category:req.query.id}).populate({
      path:'category',
      select:{"categoryName":1},
  });
  var cat = await category.findById(req.query.id);
  var venders=await vender.find({category:cat.categoryName});
    return response.userResponse(res, "All Products of This Category", getAllProduct);
  } catch (error) {
    console.log("error ", error);
    return response.negativeResponce(res, `error +${error}`, error);
  }
}
async function getAllVender(req, res) {
  try {
    console.log("get all vender api : ")
    const getAllvender = await vender.find({otp:null});
    return response.userResponse(res, "All venders", getAllvender);
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
    var { _id ,vender} = req.body;
    var approved = await task.findByIdAndUpdate(_id, { approvedByQualityChaker: true,selectedVender:vender });;
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
async function VenderProductAccess(req, res) {
  try {
  var {price,date,description,ser_no,id}=req.body;
    var taskdata=await task.findOne({task_no:ser_no});
    if (taskdata) {
      const match = taskdata.venders.find(vendor =>
        {
      return  vendor.ven_id == id}); 
      if (match) {
        return response.negativeResponce(res, `already submitted your response`, {});
      } else {
        var data = await vender.findOne({_id:id}).
          select({"venderName":1,"phoneNum":1,"address":1,"completeinfo":1,"category":1})
      
        taskdata.venders.push({ ven_id:id, price, send_Prod_date:date,Prod_desc: description ,ven_info:data});
        await taskdata.save();
        return response.userResponse(res, "Products ", {});
      }
    } else {
      return response.negativeResponce(res, "plz connect witch company ", {});
    }
  } catch (error) {
    console.log("error ", error);
    return response.negativeResponce(res, `error +${error}`, error);
  }
}
async function getAllVenderByCategory(req, res) {
  try {
    var id = req.query.product_id;
    var categoryName=await Product.findById(id).populate({path:'category',select:{"categoryName":1}});
    if(categoryName){
      var venders= await vender.find({ category: { $in: categoryName.category.categoryName } })
      return response.userResponse(res, " all vrnders data with tis category : -", venders);
    }
    // return response.negativeResponce(res, `error +${error}`, error);
  } catch (error) {
    console.log("error ", error);
    return response.negativeResponce(res, `error +${error}`, error);
  }
}
async function allvendersbytask(req, res) {
  try {
    var ser_no = req.query.ser_no;
    var taskdata=await task.findOne({task_no:ser_no}).populate({
      path:'venders',
      select:{"venderName":1,"phoneNum":1,"address":1,"completeinfo":1,"category":1}}
    );
    if(taskdata){
  return response.userResponse(res, " all vrnders data : -", taskdata);    
}else{
  return response.negativeResponce(res, `may be someone delete this task`, error);
}
  } catch (error) {
    console.log("error ", error);
    return response.negativeResponce(res, `error +${error}`, error);
  }
}
async function buyProduct(req,res){
  try {
    var { product_id ,quantity,categoryid,description} = req.body;
    // console.log("body ",product_id ,quantity)
    var ser_no= await generateUniqueSerialNumber();
    const tsknum=await TaskModel.find({ serial_no:ser_no,softDelete:false});
    const product = await Product.findById(product_id).select({price:1,category:1,productName:1});
    const Cat=await category.findById(product.category);
    // console.log("venders : ","category ",Cat)
    const venders=await vender.find({category:Cat.categoryName});
    const productPrice = product.price;
    var name=product.productName;
    const taskPrice=productPrice*quantity;
    var newTask= new TaskModel({});
      // ser_no=ser_no;
      newTask.task_no=ser_no;
      newTask.price=taskPrice;
      newTask.quantity=quantity;
      newTask.userReq=req.user._id;
      newTask.productID=product_id;
      newTask.description=description;
      // mailhelper.venderBuyProductEmail(venders.)
    await venders.forEach(vendor => {
        // console.log(vendor.email);
        mailhelper.venderBuyProductEmail(vendor.email,quantity,vendor.venderName,description,ser_no,vendor._id,name)
      });
      await newTask.save();
      response.userResponse(res, "send req  ", newTask);
  } catch (error) {
    console.log("---error are in buy product controller function  ::---  ",error);
    response.negativeResponce(res, "error", {});
  }
}
async function buyProductPerticularvender(req,res){
  try {
   
    var { product_id ,quantity,categoryid,description,selectedVendorsId} = req.body;
    var ser_no=await generateUniqueSerialNumber();
    // console.log("--353")
    const tsknum=await TaskModel.find({ serial_no:ser_no,softDelete:false});
    const product = await Product.findById(product_id).select({price:1,category:1,productName:1});
    const Cat=await category.findById(product.category);
    console.log("venders : ","category ",Cat)
    const venders=await vender.find({category:Cat.categoryName});
    const productPrice = product.price;
    var name=product.productName;
    const taskPrice=productPrice*quantity;
    // const taskPrice=productPrice*quantity;
    var newTask= new TaskModel({});
      // ser_no=ser_no;
      newTask.task_no=ser_no;
      newTask.price=taskPrice;
      newTask.quantity=quantity;
      newTask.userReq=req.user._id;
      newTask.productID=product_id;
      newTask.description=description;
      // mailhelper.venderBuyProductEmail(venders.)
    await venders.forEach(vendor => {
        if (selectedVendorsId.includes(vendor._id)) {
    mailhelper.venderBuyProductEmail(vendor.email, quantity, vendor.venderName, description, ser_no, vendor._id, name);
  }
      });
      await newTask.save();
      response.userResponse(res, "Task Create", newTask);
  } catch (error) {
    console.log("---error are in buy product controller function  ::---  ",error);
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
async function deleteVender(req, res) {
  try {
    var { _id } = req.body;
    var deleteP = await vender.findByIdAndDelete(_id);
    response.userResponse(res, "Product are deleted", {});
  } catch (error) {
    console.log("error in delete Product Function function ", error);
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
    var { productName, price ,category,description} = req.body;
    var checkproduct = await Product.findOne({ productName: productName });

    if (checkproduct == null) {
      // console.log("2====", checkproduct);
      var prodObj = new Product({});
      prodObj.productName = productName;
      prodObj.price = price;
      prodObj.description = description;
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
    const getAllProduct = await Product.find({}).populate({
      path:'category',
      select:{"categoryName":1},
  });;
    return response.userResponse(res, "All Products", getAllProduct);
  } catch (error) {
    console.log("error ", error);
    return response.negativeResponce(res, `error +${error}`, error);
  }
}

