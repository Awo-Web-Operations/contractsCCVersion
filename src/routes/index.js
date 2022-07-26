const { AuthController } = require("../controllers/AuthController");

const router = require("express").Router();

// User Routes
router.get("/", (req, res) => res.send({ message: "Hello!!!" }));

// auth 
router.post('/signup', AuthController.signup)

module.exports = router;
