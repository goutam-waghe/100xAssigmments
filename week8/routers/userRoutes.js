const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const z = require("zod");
const auth = require("../middleware/auth");

//user signup
userRouter.post("/signup", async function (req, res) {
  const requiredBody = z.object({
    email: z.string().email(),
    name: z.string().min(3),
    password: z.string().min(6).max(50),
  });

  const parsedData = requiredBody.safeParse(req.body);
  if (!parsedData.success) {
    res.status(300).json({
      Message: "incorrect Formate",
      Error: parsedData.error,
    });
    return;
  }

  const { name, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    res.json({
      Message: "user Aleardy Exits",
    });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 5);
  try {
    await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
  } catch (error) {}

  res.json({
    Message: "user registered",
  });
});

//user login
userRouter.post("/login", async function (req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    res.json({
      Message: "register first",
    });
    return;
  }
  const isMateched = await bcrypt.compare(password, user.password);
  if (!isMateched) {
    res.json({
      Message: "password is wrong",
    });
    return;
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.json({
    Message: "user loged in",
    token,
  });
});

//user mycourses
userRouter.get("/mycourses", function (req, res) {
  res.json({
    Message: "my courses",
  });
});
userRouter.get("/allcourses", function (req, res) {
  res.json({
    Message: "see all courses",
  });
});
userRouter.post("/purchase", function (req, res) {
  res.json({
    Message: "purchased course",
  });
});
module.exports = userRouter;
