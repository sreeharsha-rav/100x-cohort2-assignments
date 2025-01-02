const { Router } = require("express");
const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { z } = require("zod");
const router = Router();

// Define Zod schemas
const userSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

// User Routes
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = userSchema.parse(req.body);
    const user = new User({ username, password });
    await user.save();
    res.json({ message: "User created successfully" });
  } catch (e) {
    res.status(400).json({ message: e.errors });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { username, password } = userSchema.parse(req.body);
    const user = await User.findOne({ username });
    if (!user || password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, "your-secret-key");
    res.json({ token });
  } catch (e) {
    res.status(400).json({ message: e.errors });
  }
});

router.get("/courses", userMiddleware, async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const username = req.headers.username;

  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  await User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourses: courseId,
      },
    },
  );
  res.json({
    message: "Purchase complete!",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const user = await User.findOne({
    username: req.headers.username,
  });

  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });
  res.json({ purchasedCourses: courses });
});

module.exports = router;
