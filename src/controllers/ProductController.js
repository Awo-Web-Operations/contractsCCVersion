const { Product } = require("../database/models");

class ProductsController {
  static async getAllProducts(req, res) {
    const products = await Product.find();

    res.status(200).json({
      products,
    });
  }
}

module.exports = ProductsController;
