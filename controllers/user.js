const User=require("../models/user");
exports.getAllUsers=async (req,res)=>{
    const users=await User.findAll();
    return res.status(200).json({users:users});
}
exports.getCurrentUser=async (req,res)=>{

    try{
        const user=await User.findOne({where:{id:req.user.id}});
        if(!user){
            return res.status(404).json({message:"user doesn't exist"});
        }
        return res.status(200).json({
            id:user.id,
            name:user.name,
            email:user.email,
            ss:"waaa"
        })
    }catch (err){
        return res.status(500).json({message:"server error please try again "});
    }
}