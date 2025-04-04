require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const placesRoutes = require("./routes/places");
const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(cors());

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Define MongoDB URI directly if environment variable isn't loading
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://quanghuy00433:CkU3od4LgelNnkL6@cafeteria.5hmqgxy.mongodb.net/?retryWrites=true&w=majority&appName=Cafeteria";

// ✅ Kết nối MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Routes
app.use("/places", placesRoutes);
app.use("/api/auth", authRoutes);

// ✅ Khởi chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
