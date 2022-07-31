require("dotenv").config({ path: ".env" });

module.exports = {
  APP_NAME: process.env.APP_NAME,
  PORT: process.env.PORT || 3030,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  APP_FRONTEND_URI: process.env.APP_FRONTEND_URI,
};
