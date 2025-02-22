const mongoose = require("mongoose");
const purchaseSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
  },
  userId: {
    type: ObjectId,
  },
});
const purchaseModel = mongoose.model("purchase", purchaseSchema);
module.exports = purchaseModel;
