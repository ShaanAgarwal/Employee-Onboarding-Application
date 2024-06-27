const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongodb_uri);
        console.log(`Connected To MongoDB Database ${mongoose.connection.host}`);
    } catch (error) {
        console.log(`MongoDB Error: ${error}`);
    }
};

module.exports = { connectDB };