const mongoose = require("mongoose");
const courseRouter = require("../routers/courseRouter");
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  lessions: {
    title: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      require: true,
    },
    duration: {
      type: String,
      required: true,
    },
  },
});
