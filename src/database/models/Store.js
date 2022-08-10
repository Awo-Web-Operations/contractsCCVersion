const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  owner: { type: mongoose.Types.ObjectId, ref: "user" },
  admins: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
      role: {
        type: String,
        enum: ["STORE_ADMIN", "SUB_STORE_ADMIN"],
      },
    },
  ],
  products: [{ type: mongoose.Types.ObjectId, ref: "product" }],
  meals: [],
  orders: [],
});

module.exports = mongoose.model("store", Schema);
