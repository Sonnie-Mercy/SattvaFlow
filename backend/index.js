const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./utils/db");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// routes
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const batchRouter = require("./routes/batchRouter");

app.use("/api/auth", authRouter);

app.use("/api/user", userRouter);

app.use("/api/batch", batchRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
});

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on port: ${port}`);
});
