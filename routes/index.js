// var express = require('express');
// var router = express.Router();

/* GET home page. */


// module.exports = router;
var express = require('express');
var router = express.Router();
const userController =require('../src/controller/userController');
router.post("/signup",userController.register);
router.post("/login",userController.login);
router.put("/reset/:id",userController.reset);
router.delete("/delete/:id",userController.deleted);
router.get("/allUser",userController.getAllUser);
module.exports = router;
