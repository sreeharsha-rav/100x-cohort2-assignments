// Find the average time the server takes to handle requests

const express = require("express");

const app = express();
let requestCount = 0;
let totalRequestTime = 0;

// Middleware to count the number of requests
function countRequest(req, res, next) {
  requestCount++;
  console.log(`Number of requests: ${requestCount}`);
  next();
}
app.use(countRequest);

// Middleware to calculate average time to handle requests
function calculateAverageTime(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    totalRequestTime += duration;
    console.log(`Request duration: ${duration}ms`);
  });
  next();
}
app.use(calculateAverageTime);

// Simulate request handling with setTimeout
app.get("/user", function (req, res) {
  setTimeout(() => {
    res.status(200).json({ name: "john" });
  }, 1000);
});

app.post("/user", function (req, res) {
  setTimeout(() => {
    res.status(200).json({ msg: "created dummy user" });
  }, 3000);
});

app.get("/averageTime", (req, res) => {
  const averageTime = requestCount > 0 ? totalRequestTime / requestCount : 0;
  res.status(200).json({ averageTime });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
