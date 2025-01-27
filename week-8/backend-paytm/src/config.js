const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const SQLITE_DB_PATH = process.env.SQLITE_DB_PATH;

module.exports = {
  PORT,
  JWT_SECRET,
  SQLITE_DB_PATH,
};
