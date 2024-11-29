const Rental=require("../models/rental");

exports.createRental=async (req,res)=>{
    try{
        const {userId, VIN, rentalDate, returnDate} = req.body;
        if (!rentalDate || !returnDate) {
            return res.status(422).json({message: "please provide the return date and the rental date"});
        }
        if (await Rental.findOne({where: {VIN: VIN}})) {
            return res.status(422).json({message: "The current car si already rented"});
        }
        await Rental.create({userId, VIN, rentalDate, returnDate});
        return res.status(201).json({message:"you have successfully rented the car"});
    }catch (err){
        return res.status(500).json({message:err});
    }
}
exports.getRentalsByUser=async (req,res)=>{
    try{
        const userId = req.user.id;
        const rentals = await Rental.findAll({where: {userId}});
        if (!rentals) {
            return res.status(200).json({message: "this user has no rentals"});
        }
        return res.status(200).json({rentals});
    }catch (err){
        return res.status(500).json({message:err});
    }
}
exports.getRental=async (req,res)=>{
    try{
        const VIN=req.params.id;
        const userId=req.user.id;
        if(!userId || !VIN){
            return res.status(422).json({message:"please "})
        }
        const rental=await Rental.findOne({where:{VIN,userId}});
        if(!rental){
            return res.status(404).json({message:"no rental found"});
        }
        return res.status(200).json({rental});
    }catch (err){
        return res.status(500).json({message:err});
    }
}
exports.deleteRental=async (req,res)=>{
    try{
        const VIN=req.params.VIN;
        const userId=req.user.id;
        const rental=await Rental.findOne({where:{VIN,userId}});
        if(!rental){
            return res.status(422).json({message:"cannot delete a non exisitng rental"});
        }
        rental.destroy();
        return res.status(200).json({message:"rental deleted succesuflly"});

    }catch (err){
        return res.status(500).json({message:err});
    }
}