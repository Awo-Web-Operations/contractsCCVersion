const ProductsController = require("../controllers/ProductController");

const router = require("express").Router();

router.get("/", ProductsController.getAllProducts);

module.exports = router;
