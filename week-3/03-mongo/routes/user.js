const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const router = Router();

// User Routes
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.json({ message: "User created successfully" });
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

  console.log(user.purchasedCourses);
  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });
  res.json({ purchasedCourses: courses });
});

module.exports = router;
