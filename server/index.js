require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", require("./src/router/authRoutes"));
app.use("/api/v1/tasks", require("./src/router/taskRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
