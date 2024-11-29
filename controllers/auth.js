const User=require("../models/user");
const RefreshAccessToken=require("../models/refreshAccessToken");
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
        const refreshToken=jwt.sign({userId:user.id},process.env.REFRESHTOKENSECRET,{subject:"refreshToken", expiresIn: "1w"});
        await RefreshAccessToken.create({
            userId:user.id,
            refreshToken:refreshToken
        })

        return res.status(200).json({
            id:user.id,
            email:user.email,
            name:user.name,
            accessToken:accessToken,
            refreshToken:refreshToken
        })

    }
    catch (err){
        return res.status(500).json({message: err});
    }
}
exports.ensureAuth=async (req,res,next)=>{
    const accessToken=req.headers.authorization;
    if(!accessToken){
        return res.status(401).json({message:"access token not found"});
    }
    try{
        const decodedAccessToken=jwt.verify(accessToken,process.env.SECRET_KEY);
        req.user= {id:decodedAccessToken.userId};
        next();
    }catch (err){
        return res.status(401).json({message:"Access token invalid or expired"});
    }
}
exports.authorize=(roles=[])=>{
    return async function(req,res,next){
        const user=await User.findOne({where:{id:req.user.id}});
        if(!roles.includes(user.role)){
            return res.status(403).json({message:"access denied"});
        }
        next();
    }
}
exports.refreshToken=async (req,res)=>{
    try{
        const {refreshToken}=req.body;
        if(!refreshToken){
            return res.status(401).json({message:"refresh token not found"});
        }
        const decodedRefreshToken=jwt.verify(refreshToken,process.env.REFRESHTOKENSECRET);
        const userRefreshToken= await RefreshAccessToken.findOne({where:{refreshToken:refreshToken,userId:decodedRefreshToken.userId}});
        if(!userRefreshToken){
            return res.status(401).json({message:"refresh token invalid or expired"});
        }
        await RefreshAccessToken.destroy({where:{refreshToken:refreshToken,userId:decodedRefreshToken.userId} });
        const accessToken=jwt.sign({userId:decodedRefreshToken.userId},process.env.SECRET_KEY,{subject:"accessApi",expiresIn: "30s"});
        const newRefreshToken=jwt.sign({userId:decodedRefreshToken.userId},process.env.REFRESHTOKENSECRET,{subject:"refreshToken", expiresIn: "2min"});
        await RefreshAccessToken.create({
            userId:decodedRefreshToken.userId,
            refreshToken:newRefreshToken
        })

        return res.status(200).json({

            accessToken:accessToken,
            refreshToken:newRefreshToken
        })



    }catch (err){
        if(err instanceof jwt.TokenExpiredError || err instanceof jwt.JsonWebTokenError){
            return res.status(401).json({message:"refresh token invalid or expired"});
        }
        return res.status(500).json({message: err});
    }
}