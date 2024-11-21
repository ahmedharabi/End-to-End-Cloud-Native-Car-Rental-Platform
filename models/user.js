const Sequelize=require("sequelize");
const sequelize=require("../util/database");

const User=sequelize.define(
    "User",
    {
        id:{
            type:Sequelize.DataTypes.UUID,
            defaultValue:Sequelize.DataTypes.UUIDV4,
            primaryKey:true
        },
        name:{
            type:Sequelize.DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:Sequelize.DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:Sequelize.DataTypes.STRING,
            allowNull:false
        }
    }
)
module.exports=User;