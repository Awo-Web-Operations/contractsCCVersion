const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("../../config");

const Schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
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
  isEmailVerified: {
    type: String,
    default: false,
  },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  foodPreferences: [
    {
      type: String,
    },
  ],
  cart: {},
  orders: [],
  userRole: {
    type: String,
    enums: ["APP_ADMIN", "STORE_ADMIN", "CUSTOMER"],
    default: "CUSTOMER",
  },
  store: {},
  dateOfBirth: String,
  street: String,
  city: String,
  country: String,
  zipCode: Number,
  ipsid: Number,
  emailnotification: Boolean,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  subscribed: Boolean,
  // list_id NUMERIC
});

Schema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(
      this.password,
      await bcrypt.genSalt()
    );
    this.password = hashedPassword;
    this.emailVerificationToken = crypto.randomBytes(64).toString("hex");
    this.emailVerificationExpires = Date.now() + (1000*60*60*24*7);
    
    return next();
  } catch (err) {
    return next(err);
  }
});

Schema.methods.comparePassword = async function (candidatePassword) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return err;
  }
};

Schema.methods.getAccessToken = (user) =>
  jwt.sign(user, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
    issuer: "Figure",
  });

Schema.methods.getRefreshToken = (user) =>
  jwt.sign(user, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
    issuer: "Figure",
  });

Schema.methods.generatedPasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(64).toString("hex");
  this.resetPasswordExpires = Date.now() + 3600000;
};

module.exports = mongoose.model("user", Schema);
