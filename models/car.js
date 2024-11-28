const sequelize=require("../util/database");
const Sequelize=require("sequelize");

const Car=sequelize.define(
    "Car",
    {
        id:{
            type:Sequelize.DataTypes.UUID,
            defaultValue:Sequelize.DataTypes.UUIDV4,
            primaryKey:true
        },
        VIN:{
            type:Sequelize.DataTypes.STRING,
            allowNull:false

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