const jwt = require("jsonwebtoken");
const { Admin } = require("../db");

async function adminMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "your-secret-key");
    if (decoded.username) {
      next();
    } else {
      res.status(403).json({ messsage: "You are not authenticated" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = adminMiddleware;
