const { AuthController } = require("../controllers/AuthController");

const router = require("express").Router();

// User Routes
router.get("/", (req, res) => res.send({ message: "Hello!!!" }));

// auth

// validate fields
router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.post("/forgot-password", AuthController.forgotPassword);
router.get(
  "/forgot-password/verify/:token",
  AuthController.forgotPasswordVerify
);
router.post("/reset-password/:token", AuthController.resetPassword);

module.exports = router;
