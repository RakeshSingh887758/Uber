const userModel = require("../models/user.model");
const userServices = require("../services/user.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel=require("../models/backlisttoken.model");

module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { fullname, email, mobile, password } = req.body;
        // console.log(fullname,email,mobile,password);

         const isUserAlreadyExist = await userModel.findOne({ email });
            if (isUserAlreadyExist) {
                return res.status(400).json({ message: "User already exist" });
            }
        const hashpassword = await userModel.hashPassword(password);
        const user = await userServices.createUser({
            firstname: fullname.firstname, lastname: fullname.lastname, email, mobile, password: hashpassword
        }
        )
        const token = user.generateAuthToken();
        res.status(201).json(
            {
                token, user
            }
        )

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        });

    }
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {email,password}=req.body;
    if(!email ||!password){
        return res.status(403).message("All fields are required");
    }
    const user=await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message:"Invalid email or password"});
    }
    const isMatch=await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:"Invalid email or password"});
    }

    const token=user.generateAuthToken();
    res.cookie('token',token);
    user.password = undefined;
    res.status(200).json({token,user});

}

module.exports.userProfile=async(req,res,next)=>{
    res.status(200).json(req.user);
}

module.exports.logoutUser=async(req,res,next)=>{
    res.clearCookie('token');
    const token=req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({token});
    res.status(200).json({message:"logged Out"});
}