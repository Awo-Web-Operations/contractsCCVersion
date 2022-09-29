const router = require("express").Router();

// User Routes
router.get("/", (req, res) => res.send({ message: "Hello!!!" }));

module.exports = router;
