const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    recipientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0.01,
      },
    },
    type: {
      type: DataTypes.ENUM("TRANSFER", "DEPOSIT", "WITHDRAW"),
      allowNull: false,
      defaultValue: "TRANSFER",
    },
    status: {
      type: DataTypes.ENUM("PENDING", "COMPLETED", "FAILED"),
      allowNull: false,
      defaultValue: "PENDING",
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "transactions",
    timestamps: true,
    createdAt: "timestamp", // rename createdAt to timestamp
    updatedAt: false, // disable updatedAt
    indexes: [
      { fields: ["senderId"] },
      { fields: ["recipientId"] },
      { fields: ["timestamp"] },
    ],
  },
);

module.exports = Transaction;
