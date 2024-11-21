const Sequelize=require("sequelize");
require("dotenv").config();
const sequelize=new Sequelize(
    "carrent",
    "root",
    "ahmedahmed",

    {dialect:"mysql",host:"localhost"}
)
module.exports=sequelize;