// var express = require('express');
// var router = express.Router();

/* GET home page. */
// pass atlas   vAIEbI81NPmNoBQZ   user name  nikhilkalkalb

// module.exports = router;
var express = require("express");
var router = express.Router();

const userController = require("../src/controller/userController");
const productController = require("../src/controller/productController");
router.post("/signup", userController.register);
router.post("/login", userController.login);
router.put("/reset/:id", userController.reset);
router.put("/convert/inventry", userController.convertInventry);
router.delete("/delete/:id", userController.deleted);
router.get("/allUser", userController.getAllUser);
router.get("/inventry/user", userController.allInventry);
router.get("/allProducts", productController.allProducts);
router.post("/create/product", productController.createProduct);
router.post("/deleteProduct", productController.deleteProduct);
module.exports = router;
