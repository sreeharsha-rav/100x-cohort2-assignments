const { Router } = require("express");
const { User, Account } = require("../db");
const { Op } = require("sequelize");
const z = require("zod");
const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

// routes
const router = Router();

// signup user
const signupRequestSchema = z.object({
  name: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6),
});

router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password } = signupRequestSchema.parse(req.body);

    // check if user already exists
    const userExists = await User.findOne({ where: { email: email } });
    if (userExists) {
      return res
        .status(411)
        .send({ success: false, message: "User already exists" });
    }

    // create user
    const user = await User.create({
      name: name,
      email: email,
      password: password,
    });

    // Create account
    const account = await Account.create({
      userId: user.id,
      balance: 1 + Math.floor(Math.random() * 10000), // random balance between 1 and 10000
    });

    res
      .status(201)
      .send({ success: true, message: "User created successfully" });
  } catch (error) {
    next(error);
  }
});

// login user
const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = loginRequestSchema.parse(req.body);

    // check if user exists
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User does not exist for the given email",
      });
    }

    // check password
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(411)
        .send({ success: false, message: "Invalid password" });
    }

    // generate token
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      JWT_SECRET
    );

    res.status(200).send({
      success: true,
      token: token,
      message: "Logged in successfully",
    });
  } catch (error) {
    next(error);
  }
});

// update user
const updateUserRequestSchema = z.object({
  name: z.string().min(3).max(30).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

router.put("/update", async (req, res, next) => {
  try {
    const { name, email, password } = updateUserRequestSchema.parse(req.body);

    if (!success) {
      return res
        .status(411)
        .send({ success: false, message: `Error updating user: ${message}` });
    }

    // update user
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    await user.save();

    res
      .status(200)
      .send({ success: true, message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
});

// get filtered users
router.get("/bulk", async (req, res, next) => {
  try {
    const filter = req.query.filter || "";

    const users = await User.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${filter}%` } },
          { email: { [Op.like]: `%${filter}%` } },
        ],
      },
      attributes: ["id", "name", "email"],
    });

    res
      .status(200)
      .send({ success: true, users: users, message: "Users fetched" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
