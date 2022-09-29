const router = require("express").Router();
const GroceryListController = require("../controllers/GroceryListController");
const { verifyAuthToken } = require("../middlewares/authMiddleware");

router.get("/", [verifyAuthToken], GroceryListController.getUserGroceryList);
router.post("/empty", [verifyAuthToken], GroceryListController.emptyList);
router.post("/add", [verifyAuthToken], GroceryListController.addItem);
router.delete("/:productId", [verifyAuthToken], GroceryListController.removeItem);

module.exports = router;
