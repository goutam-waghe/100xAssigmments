const express = require("express");
const mongoose = require("mongoose");
const { UserModel, TodoModel } = require("./db.js");
const jwt = require("jsonwebtoken");
const auth = require("./auth.js");
const bcrypt = require("bcrypt");
const z = require("zod");
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
  const requiredBody = z.object({
    email: z.string().min(3).max(100).email(),
    name: z.string().min(3).max(100),
    password: z.string().min(3).max(30),
  });

  // const parsedData = requiredBody.parse(req.body);
  //assginemnt - check 1 uppercase and lowerccase and spacail charactor
  const parsedData = requiredBody.safeParse(req.body);
  if (!parsedData.success) {
    res.status(300).json({
      Message: "incorrect Formate",
      Error: parsedData.error,
    });
    return;
  }
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
  const hashedPassword = await bcrypt.hash(password, 5);
  console.log(hashedPassword);
  await UserModel.create({
    username: username,
    email: email,
    password: hashedPassword,
  });

  res.json({
    Message: "You are register succesfully",
  });
});

// login endpoint
app.post("/login", async function (req, res) {
  const { password, email } = req.body;
  const user = await UserModel.findOne({ email });
  console.log(user);

  if (!user) {
    res.json({
      Message: "register first",
    });
    return;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
  if (!isMatch) {
    res.json({ Message: "Your password is wrong" });
    return;
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    "gtm0012"
  );

  res.json({
    token: token,
  });
});

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

app.patch("/todos/:id", async function (req, res) {
  const todoId = req.params.id;
  console.log(req.body);
  const update = req.body;

  try {
    const updatedtodo = await TodoModel.findByIdAndUpdate(todoId, update, {
      new: true,
    });
    if (!updatedtodo) {
      res.status(404).json({
        Message: "todo not found",
      });
    }
    res.json({
      updatedtodo,
      Message: "todo is updated",
    });
  } catch (error) {
    res.status(500).json({
      Message: "Error while updating todo",
      Error: error,
    });
  }
});

app.listen(3000, function () {
  console.log("server is running on 3000");
});
