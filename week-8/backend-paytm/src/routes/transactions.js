const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const validateRequest = require("../middlewares/validate");
const {
  depositSchema,
  transferSchema,
  withdrawSchema,
} = require("../utils/validators");
const { Op } = require("sequelize");
const { sequelize, User, Transaction } = require("../models/index");

// deposit money
router.post(
  "/deposit",
  [authMiddleware, validateRequest(depositSchema)],
  async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const user = await User.findByPk(req.userId, { transaction: t });
      const { amount, description } = req.validatedData;

      const transaction = await Transaction.create(
        {
          senderId: user.id,
          recipientId: user.id,
          amount: amount,
          type: "DEPOSIT",
          status: "PENDING",
        },
        { transaction: t },
      );

      user.balance += amount;
      await user.save({ transaction: t });

      await transaction.update({ status: "COMPLETED" }, { transaction: t });

      await t.commit();

      res.json({
        success: true,
        message: `Successfully deposited ${amount}`,
        currentBalance: user.balance,
      });
    } catch (error) {
      await t.rollback();
      res
        .status(400)
        .json({ success: false, message: "Deposit failed", error });
    }
  },
);

// transfer money
router.post(
  "/transfer",
  [authMiddleware, validateRequest(transferSchema)],
  async (req, res) => {
    const t = await sequelize.transaction();

    try {
      const sender = await User.findByPk(req.userId, { transaction: t });
      const { amount, recipientEmail, description } = req.validatedData;
      const recipient = await User.findOne(
        {
          where: { email: recipientEmail },
        },
        { transaction: t },
      );

      if (!recipient) {
        throw new Error("Recipient not found");
      }

      if (sender.balance < amount) {
        throw new Error("Insufficient balance");
      }

      if (sender.id === recipient.id || sender.email === recipient.email) {
        throw new Error("Cannot transfer to self");
      }

      const transaction = await Transaction.create(
        {
          senderId: sender.id,
          recipientId: recipient.id,
          amount: amount,
          type: "TRANSFER",
          status: "PENDING",
        },
        { transaction: t },
      );

      sender.balance -= amount;
      recipient.balance += amount;

      await Promise.all([
        sender.save({ transaction: t }),
        recipient.save({ transaction: t }),
      ]);

      await transaction.update({ status: "COMPLETED" }, { transaction: t });

      await t.commit();
      res.json({
        success: true,
        message: `Successfully transferred ${amount} to ${recipientEmail}`,
        currentBalance: sender.balance,
      });
    } catch (error) {
      await t.rollback();
      res
        .status(400)
        .json({ success: false, message: "Transfer failed", error });
    }
  },
);

// withdraw money
router.post(
  "/withdraw",
  [authMiddleware, validateRequest(withdrawSchema)],
  async (req, res) => {
    const t = await sequelize.transaction();

    try {
      const user = await User.findByPk(req.userId, { transaction: t });
      const { amount } = req.validatedData;

      if (user.balance < amount) {
        throw new Error("Insufficient balance");
      }

      const transaction = await Transaction.create(
        {
          senderId: user.id,
          recipientId: user.id,
          amount: amount,
          type: "WITHDRAW",
          status: "PENDING",
        },
        { transaction: t },
      );

      user.balance -= amount;
      await user.save({ transaction: t });

      await transaction.update({ status: "COMPLETED" }, { transaction: t });

      await t.commit();
      res.json({
        success: true,
        message: `Successfully withdrew ${amount}`,
        currentBalance: user.balance,
      });
    } catch (error) {
      await t.rollback();
      res
        .status(400)
        .json({ success: false, message: "Withdrawal failed", error });
    }
  },
);

// get transaction history
router.get("/history", authMiddleware, async (req, res) => {
  try {
    console.log("req.userId", req.userId);
    const transactions = await Transaction.findAll({
      where: {
        [Op.or]: [{ senderId: req.userId }, { recipientId: req.userId }],
      },
      include: [
        { model: User, as: "sender", attributes: ["name", "email"] },
        { model: User, as: "recipient", attributes: ["name", "email"] },
      ],
      order: [["timestamp", "DESC"]],
    });

    res.json({ success: true, transactions });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to fetch transactions", error });
  }
});

module.exports = router;
