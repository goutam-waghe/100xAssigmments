const express = require("express");
const dotenv = require("dotenv");
const dbconnection = require("./db/dbconnection.js");
const courseRouter = require("./routers/courseRouter.js");
const userRouter = require("./routers/userRoutes.js");
const adminRouter = require("./routers/adminRouter.js");
const app = express();
dotenv.config();
dbconnection();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/users", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

app.listen(PORT, function () {
  console.log("server is listing on", PORT);
});
