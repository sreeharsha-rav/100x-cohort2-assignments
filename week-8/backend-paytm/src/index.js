const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const accountRouter = require("./routes/account");
const { PORT } = require("./config");
const authMiddleware = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// middlewares
app.use("*", cors());
app.use(express.json());

// routes
app.get("/api/v1/health", (req, res, next) => {
  res.send("I am healthy");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/user/update", authMiddleware, userRouter);
app.use("/api/v1/user/bulk", authMiddleware, userRouter);
app.use("/api/v1/account", authMiddleware, accountRouter);

// error handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
