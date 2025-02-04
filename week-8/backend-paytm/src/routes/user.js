const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/index");
const config = require("../config/config");
const validateRequest = require("../middlewares/validate");
const authMiddleware = require("../middlewares/auth");
const { registerSchema, loginSchema } = require("../utils/validators");

// sign up user
router.post("/signup", validateRequest(registerSchema), async (req, res) => {
  try {
    const { email, name, password } = req.validatedData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      name,
      password: hashedPassword,
      balance: Math.floor(1000 + Math.random() * 9000, 2), // random balance b/w 1000 and 9999
    });

    const token = jwt.sign({ userId: user.id }, config.JWT_SECRET, {
      expiresIn: "24h",
    });

    res
      .status(201)
      .json({ success: true, message: "User created successfully", token });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ success: false, error: "Email already exists" });
    }
    res
      .status(400)
      .json({ success: false, message: "Registration failed", error });
  }
});

// sign in user
router.post("/signin", validateRequest(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.validatedData;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found, invalid email" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user.id }, config.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ success: true, message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ success: false, message: "Login failed", error });
  }
});

// get user details
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: { exclude: ["password"] },
    });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get user" });
  }
});

// get balance
router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, { attributes: ["balance"] });
    res.json({ success: true, balance: user.balance });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get balance" });
  }
});

// get all users
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password", "balance", "createdAt", "updatedAt"],
      },
    });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get users" });
  }
});

module.exports = router;
