const mongoose = require("mongoose");
const bcript=require("bcrypt");
const jwt=require("jsonwebtoken");
const captainSchema = new mongoose.Schema(
    {
        fullname: {
            firstname: {
                type: String,
                required: true,
                minlength: [3, 'Fistname must be altleat 3 character long']
            },
            lastname: {
                type: String,
                minlength: [3, 'Fistname must be altleat 3 character long']
            }
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Please enter a valid email address'
            ]
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        socketId: {
            type: String
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'inactive'
        },
        vehicle: {
            color: {
                type: String,
                required: true,
                minlength: [3, 'Fistname must be altleat 3 character long']
            },
            plate: {
                type: String,
                required: true,
                minlength: [3, 'Fistname must be altleat 3 character long']
            },
            capacity: {
                type: String,
                required: true,
                minlength: [1, 'Fistname must be altleat 1 character long']
            },
            vehicleType: {
                type: String,
                required: true,
                enum: ['car', 'motorcycle', 'auto'],
            }
        },
        location: {
            lat: {
                type: Number,
            },
            logitute: {
                type: Number

            }
        }
    }
)

captainSchema.methods.generatAuthToken=function(){
    const token=jwt.sign({_id:this._id,},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}
captainSchema.methods.comparePassword=async function (password){
    return await bcript.compare(password,this.password);
}
captainSchema.statics.hashPassword=async function (password) {
    return await bcript.hash(password,10);
}
const captainModel=mongoose.model('captain',captainSchema);
module.exports=captainModel;