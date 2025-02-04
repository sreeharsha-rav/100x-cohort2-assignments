const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user");
const transactionRoutes = require("./routes/transactions");
const config = require("./config/config");
const sequelize = require("./config/db");

const app = express();

// middlewares
app.use("*", cors());
app.use(express.json());

// database connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log("Database connection failed!", err));

// sync models
sequelize
  .sync({ force: false })
  .then(() => console.log("Models synced"))
  .catch((err) => console.log("Model sync failed", err));

// routes
app.get("/api/v1/health", (req, res) => {
  res.send("I am healthy");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/transaction", transactionRoutes);

// unknown route handler
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Start the server
app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
});
