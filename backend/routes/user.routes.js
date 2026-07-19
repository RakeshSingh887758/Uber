const express=require("express");
const {body}=require("express-validator");
const userController=require("../controller/user.controller");
const authMiddleware=require("../middlewares/auth.middleware");

const router=express.Router();

router.post("/register",[
    body('email').isEmail().withMessage("Invalide Email"),
    body('fullname.firstname').isLength({min:3}).withMessage('First name at least 3 characters long!'),
    body('mobile').isLength({min:10}).withMessage("Mobile no must be 10 numbers long"),
    body('password').isLength({min:6}).withMessage("Password must be 6 charactor long")


],userController.registerUser);

router.post("/login",[
     body('email').isEmail().withMessage("Invalide Email"),
      body('password').isLength({min:6}).withMessage("Password must be 6 charactor long")
],userController.loginUser);

router.get("/profile",authMiddleware.authUser,userController.userProfile);
router.get("/logout",authMiddleware.authUser,userController.logoutUser);
module.exports=router;