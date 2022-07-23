require("dotenv").config({ path: ".env" });

module.exports = {
  APP_NAME: process.env.APP_NAME,
  PORT: process.env.PORT || 3030,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
};
