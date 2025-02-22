const mongoose = require("mongoose");
async function dbconnection() {
  try {
    await mongoose.connect(
      "mongodb+srv://goutamwaghe:gtm00012@cluster0.bi5mp.mongodb.net/course-selling-app"
    );
  } catch (e) {
    console.log("mongoDb connection Error", e);
  }
  console.log("db coneected");
}

module.exports = dbconnection;
