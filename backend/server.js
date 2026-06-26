require("dotenv").config();

const express = require("express");
const cors = require("cors");
const compression = require("compression");
const connectDB = require("./config/db");
const voteRoutes = require("./routes/voteRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const voterRoutes = require("./routes/voterRoutes");
const adminRoutes = require("./routes/adminRoutes");
const verificationRoutes = require("./routes/verificationRoutes");
const app = express();
console.log("Mongo URI:", process.env.MONGO_URI);

// Connect to MongoDB
connectDB();

// Middleware
app.use(compression());
app.use(cors());
app.use(express.json({
  limit: "20mb",
}));
app.use(express.urlencoded({
  extended: true,
  limit: "20mb",
}));
app.use("/api/voters", voterRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/votes", voteRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/verifications", verificationRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("BioVote Backend is running 🚀");
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});