const express=require("express");
const {listen} = require("express/lib/application");
const app=express();
const sequzlize=require("./util/database");
const auth=require('./routes/auth');
sequzlize.sync();
app.use(express.json());
app.use("/api/auth",auth);


app.listen(3000,()=>console.log("listening on port 3000"));