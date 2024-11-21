const express=require("express");
const {listen} = require("express/lib/application");
const app=express();
const sequzlize=require("./util/database");
const auth=require('./routes/auth');
const user=require("./routes/user");
sequzlize.sync();
app.use(express.json());
app.use("/api/auth",auth);
app.use("/api/users",user);


app.listen(3000,()=>console.log("listening on port 3000"));