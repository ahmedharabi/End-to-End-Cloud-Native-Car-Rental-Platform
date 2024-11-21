const User=require("../models/user");
const bcrypt=require("bcryptjs");
const {where} = require("sequelize");


exports.register= async (req,res)=>{

    try {
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(422).json({message:"Please fill all the fields"})
        }
        if(await User.findOne({where:{email:email}})){
            return res.status(409).json({message: "email already exists"});
        }
        const hashedPassword= await bcrypt.hash(password,12);
        const newUser= await User.create({
            name:name,
            email:email,
            password:hashedPassword
        })
        return res.status(201).json({message:"user created succefully"})
        }catch (err){
            return res.status(500).json({message: err})
        }


}