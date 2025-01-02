const { Admin } = require("../db");

async function adminMiddleware(req, res, next) {
  const { username, password } = req.headers;
  if (!username || !password) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const admin = await Admin.findOne({ username, password });
  if (!admin) {
    return res.status(403).json({ message: "Admin doesnt exist" });
  }

  next();
}

module.exports = adminMiddleware;
