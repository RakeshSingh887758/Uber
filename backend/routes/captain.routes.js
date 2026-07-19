const express=require("express");
const router=express.Router();
const {body}=require("express-validator");
const captainConreoller=require("../controller/captain.controller");
router.post("/register",[ 
     body('email').isEmail().withMessage('Invalid Email'),
     body('fullname.firstname').isLength({min:3}).withMessage("First Name must be at least 3 character long"),
     body('password').isLength({min:6}).withMessage("Password must be at least 6 character long"),
     body('vehicle.color').isLength({min:3}).withMessage("Color must be at least 3 character long"),
     body('vehicle.plate').isLength({min:3}).withMessage("Plate must be at least 3 character long"),
     body('vehicle.capacity').isInt({min:1}).withMessage("Capactiy must be at least 1"),
     body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage("Invalide values"),
    ],captainConreoller.RegisterCaptain);
module.exports=router; 