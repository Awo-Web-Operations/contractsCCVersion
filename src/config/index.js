require("dotenv").config({ path: ".env" });

module.exports = {
  APP_NAME: process.env.APP_NAME,
  PORT: process.env.PORT || 3030,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
};
