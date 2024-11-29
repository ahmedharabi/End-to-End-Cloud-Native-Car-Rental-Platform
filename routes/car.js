const express=require("express");
const router=express.Router();

const carController=require("../controllers/car");
const authController=require("../controllers/auth");

router.get("/",carController.getAllAvailableCars);
router.get("/:id",carController.getCar);
router.post("/",authController.ensureAuth,authController.authorize(["admin"]),carController.addCar);
router.put("/:id",authController.ensureAuth,authController.authorize(["admin"]),carController.updateCar);
router.delete("/:id",authController.ensureAuth,authController.authorize(["admin"]),carController.deleteCar);

module.exports=router;
