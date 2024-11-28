const express=require("express");
const router=express.Router();
const authController=require("../controllers/auth");
const userController=require("../controllers/user");

router.get("/me",authController.ensureAuth,userController.getCurrentUser);
router.get("/all",authController.ensureAuth,authController.authorize(["admin"]),userController.getAllUsers);

module.exports=router;

