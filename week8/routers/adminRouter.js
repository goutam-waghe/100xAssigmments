const { Router } = require("express");

const adminRouter = Router();
adminRouter.get("/", function (req, res) {
  res.json({
    Message: "admin endpoint",
  });
});
module.exports = adminRouter;
