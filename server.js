import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, getDBStatus } from "./config/db.js";
import { seedDatabase } from "./seed.js";

import authRoutes from "./routes/authRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import rsvpRoutes from "./routes/rsvpRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import wasteRoutes from "./routes/wasteRoutes.js";
import configRoutes from "./routes/configRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/rsvps", rsvpRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/waste", wasteRoutes);
app.use("/api/config", configRoutes);

// Health check & MongoDB Status endpoint
app.get("/api/health", (req, res) => {
  const dbStatus = getDBStatus();
  res.json({
    success: true,
    message: "Smart Hostel API is online!",
    mongoDb: {
      url: process.env.MONGODB_URI || "mongodb://localhost:27017/smarthostel",
      isConnected: dbStatus.isConnected,
      host: dbStatus.host,
      database: dbStatus.name || "smarthostel",
      statusText: dbStatus.isConnected ? "Connected to MongoDB" : "Disconnected / Mock Fallback"
    }
  });
});

// Start Server
const server = app.listen(PORT, async () => {
  console.log(`🚀 Smart Hostel Backend Server running on http://localhost:${PORT}`);
  await connectDB();
  await seedDatabase();
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use by another process. Please stop existing Node instances or restart.`);
  } else {
    console.error("❌ Server Error:", err.message);
  }
});

