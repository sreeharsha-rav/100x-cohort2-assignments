const { Router } = require("express");
const { sequelize, Account, User } = require("../db");
const z = require("zod");

// routes
const router = Router();

// get account balance
router.get("/balance", async (req, res, next) => {
  try {
    const account = await Account.findOne({ where: { userId: req.user.id } });
    res.status(200).send({ success: true, balance: account.balance });
  } catch (error) {
    next(error);
  }
});

// transfer money
const transferRequestSchema = z.object({
  to: z.string().email(),
  amount: z.number().int().positive(),
});

router.post("/transfer", async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    // validate request
    const { to, amount } = transferRequestSchema.parse(req.body);

    // check if sender and receiver are same
    if (to === req.user.email) {
      await transaction.rollback();
      return res
        .status(400)
        .send({ success: false, message: "Cannot transfer to self" });
    }

    // fetch from account
    const fromAccount = await Account.findOne({
      where: { userId: req.user.id },
      transaction,
    });

    // check if sender has sufficient balance
    if (!fromAccount || fromAccount.balance < amount) {
      await transaction.rollback();
      return res
        .status(400)
        .send({ success: false, message: "Insufficient balance" });
    }

    // fetch to account and user
    const toUser = await User.findOne({
      where: { email: to },
      transaction,
    });
    const toAccount = await Account.findOne({
      where: { userId: toUser.id },
      transaction,
    });

    // check if receiver account exists
    if (!toUser || !toAccount) {
      await transaction.rollback();
      return res
        .status(404)
        .send({ success: false, message: "Receiver account not found" });
    }

    // transfer money
    fromAccount.balance -= amount;
    toAccount.balance += amount;

    await fromAccount.save({ transaction });
    await toAccount.save({ transaction });

    // commit transaction
    await transaction.commit();

    res
      .status(200)
      .send({ success: true, message: "Money transfer successful" });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
});

module.exports = router;
