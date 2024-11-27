// src/app.js
import express from "express";
import dotenv from "dotenv";
import schoolRoutes from "./routes/schoolRoutes.js";

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Set up routes
app.use("/api", schoolRoutes);

// Error handling for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
