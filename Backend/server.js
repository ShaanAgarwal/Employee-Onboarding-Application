const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const formRoutes = require("./routes/formRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const hrRoutes = require("./routes/hrRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const onboardingRoutes = require("./routes/onboardingRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { connectDB } = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/form", formRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/hr", hrRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  try {
    return res.json({ message: "Server Is Running Properly", success: true });
  } catch (error) {
    return res.json({ message: "Internal Server Error", success: false });
  }
});

const PORT = 8081;
const MODE = "development";

app.listen(PORT, (req, res) => {
  console.log(
    `Node Server Running In ${MODE} Mode on port no ${PORT}`
  );
});
