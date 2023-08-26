// Package Imports
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const formRoutes = require('./routes/formRoutes');
const authRoutes = require('./routes/authRoutes');

// Importing Mongoose
const { connectDB } = require("./config/db");

// DOTENV Config
dotenv.config();

// MongoDB Connection
connectDB();

// Rest Objects
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', formRoutes);
app.use('/api/auth', authRoutes);

// Port
const PORT = process.env.PORT || 8080;

// Listen
app.listen(PORT, (req, res) => {
    console.log(`Node Server Running In ${process.env.DEV_MODE} Mode on port no ${PORT}`.bgCyan.white);
});