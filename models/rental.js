const sequzelize=require("../util/database");
const Sequzelize=require("sequelize");
const {DataTypes} = require("sequelize");

const Rental=sequzelize.define("Rental",
    {
        userId: {
            type:Sequzelize.DataTypes.UUID,
            primaryKey:true
        },
        VIN: {
            type:Sequzelize.DataTypes.STRING,
            primaryKey:true
        },
        rentalDate:{
            type:Sequzelize.DataTypes.DATE,
            defaultValue:DataTypes.NOW
        },
        returnDate:{
            type:DataTypes.DATE,
            allowNull:true
        }
    })

module.exports=Rental;