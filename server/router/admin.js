const express = require("express");
const jwt = require("jsonwebtoken");

const { Admin, Course } = require("../db/index");
const { authenticateJwt, SECREATKEY } = require("../middleware/auth");

const router = express.Router();

// Admin routes
router.get("/me", authenticateJwt, async (req, res) => {
  const admin = await Admin.findOne({ username: req.user.username });
  if (!admin) {
    res.status(403).json({ message: "Admin doesn't exist" });
  }
  res.json({ username: admin.username });
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username }); // just like .find() method of array
  if (admin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    const newAdminObj = { username, password };
    const newAdmin = new Admin(newAdminObj); //creating instance of newAdmin
    await newAdmin.save(); //saving newAdmin to DB
    const token = jwt.sign({ username, role: "admin" }, SECREATKEY, {
      expiresIn: "1h",
    });
    res.json({ message: "Admin created successfully", token });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECREATKEY, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.post("/courses", authenticateJwt, async (req, res) => {
  // const course = req.body;    //course obj
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course created successfully", courseId: course.id });
});

router.put("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
    new: true,
  }); // will return the updated course or err //The { new: true } option is used to ensure that the updated course is returned in the updatedCourse variable
  if (course) {
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

router.get("/course/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) {
    res.status(403).json({ message: "Course doesn't exist" });
  }
  res.json({ course });
});

router.get("/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({}); //It allows you to find multiple documents that satisfy the specified conditions.
  //empty obj {} means => retrieve all documents in the specified collection ie Courses
  res.json({ courses });
});

module.exports = router;
