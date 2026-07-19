const mongoose = require("mongoose");

async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB is connected successfully");
    } catch (err) {
        console.error("Database connection failed:", err);
        process.exit(1); // Optional: Exit the process if DB connection fails
    }
}

module.exports = connectToDb;