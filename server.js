import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectToMongoDB, client } from "./middleware/connectToMongoDB.js";
import authRouter from "./middleware/authRoutes.js";
import dataRouter from "./middleware/dataRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Auth routes
app.use("/auth", authRouter);

// Data routes
app.use("/data", dataRouter);

// Handle any requests that don't match the above routes
app.get("*", (req, res) => {
  const filePath = path.join(__dirname, "../frontend/dist", "index.html");
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log("Error sending file", err);
      res.status(err.status).end();
    } else {
      console.log("Serving file from:", filePath);
    }
  });
});

async function startServer() {
  try {
    await connectToMongoDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  console.log("Closing MongoDB connection...");
  await client.close();
  console.log("MongoDB connection closed.");
  process.exit(0);
});

startServer();
