const express = require("express");
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const adminRouter = require("./router/admin");
const userRouter = require("./router/user");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.get("/", (req, res) => res.json({ msg: "hello world after the class" }));

//to connect mongoDB
mongoose.connect(
  "mongodb+srv://amanrawat9690:1OrKGoXfozOszSHz@cluster0.grdmre6.mongodb.net",
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" } //dbName: "courses"
);

app.listen(3000, () => {
  console.log("Server is listening on port 3000 ");
});
