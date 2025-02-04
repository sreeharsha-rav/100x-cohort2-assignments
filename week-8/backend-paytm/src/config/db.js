const { Sequelize } = require("sequelize");
const config = require("./config");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: config.SQLITE_DB_PATH,
});

module.exports = sequelize;
