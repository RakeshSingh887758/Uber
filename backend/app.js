const dotenv=require("dotenv");
dotenv.config();
const express=require("express");
const cookieParser=require("cookie-parser");
const connectToDb=require("./db/db.js");
const userroutes=require("./routes/user.routes.js");
const captainroutes=require("./routes/captain.routes.js");
const cors=require("cors");
const app=express();
connectToDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/user",userroutes);
app.use("/captain",captainroutes);

app.get("/",(req,res)=>{
    res.send("Hello,Welcome to Uber page");
})

module.exports=app;