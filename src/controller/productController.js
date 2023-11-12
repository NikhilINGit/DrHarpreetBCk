const Product = require("../model/productModel");
const response = require("../helper/responceHelper");
exports.allProducts = allProducts;
exports.createProduct = createProduct;
// exports.createProduct=createProduct;
exports.deleteProduct = deleteProduct;

async function deleteProduct(req, res) {
  console.log("-------", req.body);
  try {
    var { _id } = req.body;
    console.log("fdfdfd0", _id);
    var deleteP = await Product.findByIdAndDelete(_id);

    // var allUsers=model.find({});
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
