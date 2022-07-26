const mongoose = require("mongoose");

const schema = mongoose.Schema({
  username: String,
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  street: String,
  city: String,
  zipCode: Number,
  ipsid: Number,
  emailnotification: Boolean,
  // list_id NUMERIC
});

module.exports = mongoose.model('customer', schema)