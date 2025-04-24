const Sequelize=require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize('carrent', 'root', 'ahmedahmed', {
    host: 'localhost',      // or the Docker service name if inside another container (e.g. 'mysql')
    dialect: 'mysql',
    port: 3306,              // default MySQL port
    logging: false           // optional: disable SQL logging in console
});

module.exports=sequelize;