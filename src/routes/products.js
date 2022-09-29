const ProductsController = require("../controllers/ProductController");
const { verifyAuthToken } = require("../middlewares/authMiddleware");
const { verifyStoreAmdin } = require("../middlewares/storeMiddleware");

const router = require("express").Router();

router.get("/", ProductsController.getAllProducts);
router.post(
  "/add/:storeId",
  [verifyAuthToken, verifyStoreAmdin],
  ProductsController.addNewProduct
);

module.exports = router;
