const { AuthController } = require("../controllers/AuthController");

const router = require("express").Router();

// auth

// validate fields
router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.get("/refresh-token", AuthController.refreshToken);
router.get("/verify-email/:token", AuthController.verifyEmail);
router.post("/forgot-password", AuthController.forgotPassword);
router.get(
  "/forgot-password/verify/:token",
  AuthController.forgotPasswordVerify
);
router.post("/reset-password/:token", AuthController.resetPassword);

module.exports = router;
