require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

const app = express();

connectDB();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true, // อนุญาตให้ส่ง Header Authorization
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // ต้องมี Authorization
  }),
);
app.use(express.json());

app.use("/api/v1/auth", require("./src/router/authRoutes"));
app.use("/api/v1/tasks", require("./src/router/taskRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
