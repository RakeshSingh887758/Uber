const userModel = require("../models/user.model");

module.exports.createUser = async ({ firstname, lastname, email, mobile, password }) => {

    if (!firstname || !email || !mobile || !password) {
        throw new Error("All fields are required");
    }
    console.log("Services calling", firstname, lastname, email, mobile, password);
    const user = new userModel({
        fullname: {
            firstname,
            lastname
        },
        email,
        mobile,
        password
    });

    await user.save();
    // console.log(user);
    return user;

}