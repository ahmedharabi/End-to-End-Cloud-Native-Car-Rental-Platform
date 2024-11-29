const sequelize=require("../util/database");
const Sequelize=require("sequelize");

const Car=sequelize.define(
    "Car",
    {

        VIN:{
            type:Sequelize.DataTypes.STRING,
            allowNull:false,
            primaryKey:true

        },
        make:{
            type:Sequelize.DataTypes.STRING,
            allowNull:false
        },
        model:{
            type:Sequelize.DataTypes.STRING,
            allowNull:false
        },
        rentPrice:{
            type:Sequelize.DataTypes.FLOAT,
            allowNull:false
        },
        rentedBy:{
            type:Sequelize.DataTypes.STRING,
            allowNull:true,
            defaultValue:null
        }
    }
)
module.exports=Car;