const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://shaanagarwalofficial:A4Tdy4h7wiADw3EX@employee-onboarding-dat.pfiw26x.mongodb.net/");
        console.log(`Connected To MongoDB Database ${mongoose.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`MongoDB Error: ${error}`.bgRed.white);
    }
};

module.exports = { connectDB };