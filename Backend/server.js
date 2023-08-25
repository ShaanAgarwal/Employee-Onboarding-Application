// Package Imports
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");

// DOTENV Config
dotenv.config();

// Rest Objects
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Port
const PORT = process.env.PORT || 8080;

// Listen
app.listen(PORT, (req,res) => {
    console.log(`Node Server Running In ${process.env.DEV_MODE} Mode on port no ${PORT}`.bgCyan.white);
});