const Sequelize=require("sequelize");
const sequelize=require("../util/database");

const RefreshAccessToken=sequelize.define(
    "RefreshAccessToken",{
        userId:{
            type:Sequelize.DataTypes.STRING,
            primaryKey:true
        },
        refreshToken:{
            type:Sequelize.DataTypes.STRING,

        }
    }
)
module.exports=RefreshAccessToken;