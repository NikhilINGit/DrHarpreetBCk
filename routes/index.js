// var express = require('express');
// var router = express.Router();

/* GET home page. */
// pass atlas   vAIEbI81NPmNoBQZ   user name  nikhilkalkalb

// module.exports = router;
var express = require("express");
var router = express.Router();
const userController = require("../src/controller/userController");
router.post("/signup", userController.register);
router.post("/login", userController.login);
router.put("/reset/:id", userController.reset);
router.put("/convert/inventry", userController.convertInventry);
router.delete("/delete/:id", userController.deleted);
router.get("/allUser", userController.getAllUser);
router.get("/inventry/user", userController.allInventry);
module.exports = router;
