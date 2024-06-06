const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://agarwalshaan27:O8B85NTkbwb1nbNi@cluster0.uvo4j8e.mongodb.net/");
        console.log(`Connected To MongoDB Database ${mongoose.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`MongoDB Error: ${error}`.bgRed.white);
    }
};

module.exports = { connectDB };