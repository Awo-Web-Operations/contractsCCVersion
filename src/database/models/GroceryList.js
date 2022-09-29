const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  products: [{ type: mongoose.Types.ObjectId, ref: "product" }],
});

module.exports = mongoose.model("grocery_list", Schema);
