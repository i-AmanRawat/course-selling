const mongoose = require("mongoose");

//mongoose schemas
const userSchema = new mongoose.Schema({
  username: { type: String }, // only string has same purpose
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // An array of ObjectIds referencing the 'Course' model
});
const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports = { User, Admin, Course };
