const User=require("../models/user");
const bcrypt=require("bcryptjs");
const {where} = require("sequelize");
const jwt=require("jsonwebtoken");
require("dotenv").config({path: "../.env"});


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
exports.login=async (req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(422).json({message:"please fill in all the fields"});
        }
        const user= await User.findOne({where:{email:email}});

        if(!user){
            return res.status(401).json({message:"email or password is invalid"});
        }
        const passwordMatch=await bcrypt.compare(password,user.password);

        if(!passwordMatch){
            return res.status(401).json({message:"email or password is invalid"});
        }
        const accessToken=jwt.sign({userId:user.id},process.env.SECRET_KEY,{subject:"accessApi",expiresIn: "1h"});
        return res.status(200).json({
            id:user.id,
            email:user.email,
            name:user.name,
            accessToken:accessToken
        })

    }
    catch (err){
        return res.status(500).json({message: err})
    }
}