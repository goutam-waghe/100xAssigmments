const express = require("express");
const mongoose = require("mongoose");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const app = express();
//  db connection
async function dbConnection() {
  await mongoose.connect(
    "mongodb+srv://goutamwaghe:goutamwaghe00012@cluster0.anthl.mongodb.net/todo100x"
  );
  console.log("db connect");
}
dbConnection();

//middleware for body parsing
app.use(express.json());

//signup endpoint
app.post("/signup", async function (req, res) {
  const username = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const user = await UserModel.findOne({ email });
  console.log(user);
  if (user) {
    res.json({
      Message: "user already Exits",
    });
    return;
  }

  await UserModel.create({
    username: username,
    email: email,
    password: password,
  });

  res.json({
    Message: "You are register succesfully",
  });
});

// login endpoint
app.post("/login", async function (req, res) {
  const { password, email } = req.body;
  const user = await UserModel.findOne({ email, password });
  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      "gtm0012"
    );

    res.json({
      token: token,
    });
  } else {
    res.json({
      Message: "register first",
    });
  }
});
//auth function
function auth(req, res, next) {
  const token = req.headers.token;
  const decoded = jwt.verify(token, "gtm0012");
  console.log(decoded);
  if (decoded) {
    req.userId = decoded.id;
    next();
  } else {
    res.json({
      Message: "invailid credentials",
    });
    return;
  }
}

//add todo endpoint
app.post("/todo", auth, async function (req, res) {
  const userId = req.userId;
  await TodoModel.create({
    userId: userId,
    title: req.body.title,
    done: req.body.done,
  });
  res.json({
    userId: userId,
  });
});

//todos endpoint
app.get("/todos", auth, async function (req, res) {
  const userId = req.userId;
  const todos = await TodoModel.find({
    userId: userId,
  });
  res.json({
    todos,
  });
});

app.listen(3000, function () {
  console.log("server is running on 3000");
});
