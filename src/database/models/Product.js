const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  size: {
    type: String,
  },
  store: {
    type: mongoose.Types.ObjectId,
    ref: "store",
    required: true,
  },
});

module.exports = mongoose.model("product", Schema);
