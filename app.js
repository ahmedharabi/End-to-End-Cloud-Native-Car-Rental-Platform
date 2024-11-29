const express=require("express");
const {listen} = require("express/lib/application");
const app=express();
const sequzlize=require("./util/database");
const auth=require('./routes/auth');
const user=require("./routes/user");
const car=require("./routes/car");
const rental=require("./routes/rental");
const User=require("./models/user");
const Car=require("./models/car");
const Rental=require("./models/rental");

Car.hasMany(Rental, { foreignKey: 'VIN' });
Rental.belongsTo(Car, { foreignKey: 'VIN' });
User.hasMany(Rental, { foreignKey: 'userId' });
Rental.belongsTo(User, { foreignKey: 'userId' });

sequzlize.sync();
app.use(express.json());
app.use("/api/auth",auth);
app.use("/api/users",user);
app.use("/api/cars", car);
app.use("/api/rentals", rental);

app.listen(3000,()=>console.log("listening on port 3000"));