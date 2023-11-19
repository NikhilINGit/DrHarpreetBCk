// var express = require('express');
// var router = express.Router();

/* GET home page. */
// pass atlas   vAIEbI81NPmNoBQZ   user name  nikhilkalkalb

// module.exports = router;
var express = require("express");
var router = express.Router();
const middleware=require("../src/middleware/authmidl");
const userController = require("../src/controller/userController");
const productController = require("../src/controller/productController");
router.post("/signup", userController.register);
router.post("/login", userController.login);
router.put("/reset/:id",middleware.authMidle, userController.reset);
router.put("/convert/inventry",middleware.authMidle, userController.convertInventry);
// router.delete("/delete/:id", userController.deleted);
router.post("/delete",middleware.authMidle,userController.deleted);
router.get("/allUser", middleware.authMidle,userController.getAllUser);
router.get("/inventry/user",middleware.authMidle, userController.allInventry);
router.get("/allProducts",middleware.authMidle, productController.allProducts);
router.post("/create/product",middleware.authMidle, productController.createProduct);
router.post("/deleteProduct",middleware.authMidle, productController.deleteProduct);
router.post("/buyProduct", middleware.authMidle,productController.buyProduct);
module.exports = router;
