const { hashSync } = require("bcrypt");
const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: "sqlite",
  host: "localhost",
  storage: path.join(__dirname, "database.sqlite"),
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log("Database connection failed!", err);
  });

// Define User model
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
      },
      set(value) {
        this.setDataValue("name", value.toLowerCase());
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      set(value) {
        this.setDataValue("email", value.toLowerCase());
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
      set(value) {
        const hashedPassword = hashSync(value, 10);
        this.setDataValue("password", hashedPassword);
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

// Define Account model
const Account = sequelize.define(
  "Account",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    balance: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

// Sync models with database
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced and ready!");
  })
  .catch((err) => {
    console.log("Database sync failed!", err);
  });

module.exports = {
  sequelize,
  User,
  Account,
};
