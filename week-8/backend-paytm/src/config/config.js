require("dotenv").config();

const config = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  SQLITE_DB_PATH: process.env.SQLITE_DB_PATH,
};

// Validate required environment variables
const requiredEnvVars = ["JWT_SECRET", "SQLITE_DB_PATH"];
const missingEnvVars = requiredEnvVars.filter((envVar) => !config[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing environment variables: ${missingEnvVars.join(", ")}`,
  );
}

module.exports = config;
