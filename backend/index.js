const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./utils/db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Define allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Define allowed headers
    credentials: false, // Set to false to avoid CORS issues
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to Sattva Flow API");
});

// Routes
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const batchRouter = require("./routes/batchRouter");

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/batch", batchRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
});

// Server start
app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on port: ${port}`);
});
