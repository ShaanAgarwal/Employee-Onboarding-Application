const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://shaanagarwal1942003:Qxi6rj8GBKQ2OcgT@cluster0.pa3lrct.mongodb.net/");
        console.log(`Connected To MongoDB Database ${mongoose.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`MongoDB Error: ${error}`.bgRed.white);
    }
};

module.exports = { connectDB };