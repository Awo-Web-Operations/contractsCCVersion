const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("../config");
const { User } = require("../database/models");
const asyncHandler = require("../utils/asyncHandler");

const verifyAuthToken = asyncHandler(async (req, res, next) => {
  // Get Token From Header / Param
  let token;

  if (req.header("Authorization")) token = req.header("Authorization");
  else if (req.params.token) token = req.params.token;
  else if (req.cookieData) token = req.cookieData.auth.refresh_token;

  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(
      token,
      req.header("Authorization") || req.params.token
        ? ACCESS_TOKEN_SECRET
        : REFRESH_TOKEN_SECRET
    );

    req.decodedUser = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid / expired" });
  }
});

module.exports = { verifyAuthToken };
