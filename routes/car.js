const express=require("express");
const router=express.Router();

const carController=require("../controllers/car");
const authController=require("../controllers/auth");

router.get("/cars",carController.getAllAvailableCars);
router.get("/cars/:id",carController.getCar);
router.post("/cars",authController.ensureAuth,authController.authorize(["admin"]),carController.addCar);
router.put("/cars/:id",authController.ensureAuth,authController.authorize(["admin"]),carController.updateCar);
router.delete("/cars/:id",authController.ensureAuth,authController.authorize(["admin"]),carController.deleteCar);

