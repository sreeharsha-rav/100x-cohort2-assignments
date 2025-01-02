const { User } = require("../db");

async function userMiddleware(req, res, next) {
  const { username, password } = req.headers;
  if (!username || !password) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(403).json({ message: "User doesnt exist" });
  }

  req.user = user;
  next();
}

module.exports = userMiddleware;
