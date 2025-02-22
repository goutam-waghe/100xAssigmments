const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const todoSchema = new mongoose.Schema({
  userId: ObjectId,
  title: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
});
const UserModel = mongoose.model("users", userSchema);
const TodoModel = mongoose.model("todos", todoSchema);
module.exports = {
  UserModel,
  TodoModel,
};
