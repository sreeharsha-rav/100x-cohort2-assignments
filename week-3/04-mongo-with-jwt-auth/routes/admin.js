const { Router } = require("express");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const { z } = require("zod");
const router = Router();

// Define Zod schemas
const adminSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

const courseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  imageLink: z.string().url(),
});

// Admin Routes
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = adminSchema.parse(req.body);
    const admin = new Admin({ username, password });
    await admin.save();
    res.json({ message: "Admin created successfully" });
  } catch (e) {
    res.status(400).json({ message: e.errors });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { username, password } = adminSchema.parse(req.body);

    const admin = await Admin.findOne({ username });
    if (!admin || password !== admin.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign({ username }, "your-secret-key");
    res.json({ token });
  } catch (e) {
    res.status(400).json({ message: e.errors });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  try {
    const { title, description, price, imageLink } = courseSchema.parse(
      req.body,
    );
    const course = new Course({ title, description, price, imageLink });
    await course.save();
    res.json({ message: "Course created successfully", courseId: course._id });
  } catch (e) {
    res.status(400).json({ message: e.errors });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
});

module.exports = router;
