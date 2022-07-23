const mongoose = require("mongoose");
const { MONGO_URI } = require("../config");

module.exports = async function () {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database up and running.");
  } catch (err) {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  }
};
