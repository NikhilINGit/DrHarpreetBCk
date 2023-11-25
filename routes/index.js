// var express = require('express');
// var router = express.Router();

/* GET home page. */
// pass atlas   vAIEbI81NPmNoBQZ   user name  nikhilkalkalb

// module.exports = router; expectAdminAccess  adminacess
var express = require("express");
var router = express.Router();
const middleware=require("../src/middleware/authmidl");
const userController = require("../src/controller/userController");
const productController = require("../src/controller/productController");
// admin apis
router.post("/signup", userController.register);
router.post("/login", userController.login);
router.put("/reset/:id",middleware.authMidle, userController.reset);

// router.put("/convert/inventry",middleware.authMidle ,userController.convertInventry);
// router.put("/convert/Quality",middleware.authMidle, userController.convertQualityCheck);
// router.put("/convert/account",middleware.authMidle, userController.convertAccount);
// router.put("/convert/guard",middleware.authMidle, userController.convertGuard);
// router.post("/delete",middleware.authMidle,userController.deleted);
// router.get("/allUser", middleware.authMidle,userController.getAllUser);
// router.get("/inventry/user",middleware.authMidle, userController.allInventry);
// router.get("/allProducts",middleware.authMidle, productController.allProducts);
// router.post("/create/product",middleware.authMidle, productController.createProduct);
// router.post("/deleteProduct",middleware.authMidle, productController.deleteProduct);

router.put("/convert/inventry",middleware.authMidle,middleware.adminacess ,userController.convertInventry);
router.put("/convert/Quality",middleware.authMidle,middleware.adminacess, userController.convertQualityCheck);
router.put("/convert/account",middleware.authMidle,middleware.adminacess, userController.convertAccount);
router.put("/convert/guard",middleware.authMidle,middleware.adminacess, userController.convertGuard);
router.post("/delete",middleware.authMidle,middleware.adminacess,userController.deleted);
router.get("/allUser", middleware.authMidle,middleware.adminacess,userController.getAllUser);
router.get("/inventry/user",middleware.authMidle,middleware.adminacess, userController.allInventry);
router.get("/allProducts",middleware.authMidle,middleware.adminacess, productController.allProducts);
router.post("/create/product",middleware.authMidle,middleware.adminacess, productController.createProduct);
router.post("/deleteProduct",middleware.authMidle,middleware.adminacess, productController.deleteProduct);
router.get("/allAccount", middleware.authMidle,middleware.adminacess,userController.allAccount);
router.get("/allGuard", middleware.authMidle,middleware.adminacess,userController.allGuard);
router.get("/allQualityCheck", middleware.authMidle,middleware.adminacess,userController.allQualityCheck);
router.get("/allTask", middleware.authMidle,middleware.adminacess,productController.getAllTask);
// userType: 3 api (inventry);

// allAccount
router.get("/inventry/allProduct",middleware.authMidle,middleware.expectAdminAccess,productController.allProducts);
router.get("/inventry/allTask",middleware.authMidle,middleware.expectAdminAccess,productController.getAllTask);
router.post("/buyProduct", middleware.authMidle,middleware.expectAdminAccess,productController.buyProduct);
// router.post("/buyProduct",productController.buyProduct);
module.exports = router;
