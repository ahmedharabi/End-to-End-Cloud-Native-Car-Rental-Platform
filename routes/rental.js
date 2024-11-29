const express=require("express");
const router=express.Router();

const authController=require("../controllers/auth");
const rentalController=require("../controllers/rental");

router.post("/",authController.ensureAuth,rentalController.createRental);
router.get("/",authController.ensureAuth,rentalController.getRentalsByUser);
router.get("/:id",authController.ensureAuth,rentalController.getRental);
router.delete("/:VIN",authController.ensureAuth,rentalController.deleteRental);

module.exports=router;