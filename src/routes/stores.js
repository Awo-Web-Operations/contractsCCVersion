const StoresController = require("../controllers/StoreController");
const { verifyAuthToken } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/", (req, res) => res.json({ message: "Got all stores" }));
router.post("/create", [verifyAuthToken], StoresController.createStore);

module.exports = router;
