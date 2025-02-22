const express = require("express");
const courseRouter = express.Router();
courseRouter.get("/", function (req, res) {
  res.json({
    Message: "course endpoint",
  });
});
module.exports = courseRouter;
