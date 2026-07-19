const dotenv=require("dotenv");
dotenv.config();
const express=require("express");
const cookieParser=require("cookie-parser");
const connectToDb=require("./db/db.js");
const routes=require("./routes/user.routes.js");
const cors=require("cors");
const app=express();
connectToDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/uber",routes);
app.get("/",(req,res)=>{
    res.send("Hello,Welcome to Uber page");
})

module.exports=app;