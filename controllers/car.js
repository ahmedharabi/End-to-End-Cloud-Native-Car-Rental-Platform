const Car =require("../models/car");
const {where} = require("sequelize");

exports.getAllAvailableCars=async (req,res)=>{
    try{
    const cars=await Car.findAll({where:{rentedBy:null}});
    if(!cars){
        return res.status(404).json({message:"there is no available cars for renting"});
    }
    else{
        return res.status(200).json({cars});
    }}
    catch (err){
        return res.status(500).json({message:err});
    }
}
exports.getCar=async (req,res)=>{
    try{
    const carId=req.params.id;
    const car=await Car.findOne({where:{VIN:carId}});
    if(!car){
        return res.status(404).json({message:"There is no car with such ID"});
    }
    else{
        return res.status(200).json({car});
    }}
    catch (err){
        return res.status(500).json({message:err});
    }
}
exports.addCar=async (req,res)=>{
    try{
        const{VIN,model,make,rentPrice}=req.body;
        if(!model || !make || !rentPrice){
            res.status(422).json({message:"Please fill in all details"})
        }
        if(await Car.findOne({where:{VIN:VIN}})){
            return res.status(409).json({message:"The car already exists"});
        }
        await Car.create({
            VIN,make,model,rentPrice
        });
        return res.status(200).json({message:"the car was successfully added"});

    }catch (err){
        res.status(500).json({message:err});
    }
}
exports.updateCar=async (req,res)=>{
    try{
        const carId=req.params.id;
        const updatedRentPrice=req.body.rentPrice;
        const car=await Car.findOne({where:{VIN:carId}});
        if(!updatedRentPrice){
            return res.status(422).json({message:"mission update attribute"});
        }
        car.rentPrice = updatedRentPrice;
        car.save();
        return res.status(202).json({message:"car updated succesfully"});
    }catch (err){
        res.status(500).json({message:err});
    }
}
exports.deleteCar=async (req,res)=>{
    try{
    const carId=req.params.id;
    if(!await Car.findOne({where:{VIN:carId}})){
        return res.status(404).json({message:"there is no such car to delete"});
    }
    await Car.destroy({where:{VIN:carId}});
    return res.status(200).json({message:"car deleted successfuly"});


    }
    catch (err){
        res.status(500).json({message:err});
    }

}
