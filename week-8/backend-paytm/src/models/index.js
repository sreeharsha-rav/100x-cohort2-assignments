const sequelize = require("../config/db");

const User = require("./User");
const Transaction = require("./Transaction");

Transaction.belongsTo(User, { as: "sender", foreignKey: "senderId" });
Transaction.belongsTo(User, { as: "recipient", foreignKey: "recipientId" });
User.hasMany(Transaction, { as: "sentTransactions", foreignKey: "senderId" });
User.hasMany(Transaction, {
  as: "receivedTransactions",
  foreignKey: "recipientId",
});

module.exports = {
  sequelize,
  User,
  Transaction,
};
