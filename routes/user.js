const express=require("express");
const router=express.Router();
const authController=require("../controllers/auth");
const userController=require("../controllers/user");

router.get("/me",authController.ensureAuth,userController.currentUser);

module.exports=router;

