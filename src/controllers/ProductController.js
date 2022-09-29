const { Product } = require("../database/models");

class ProductsController {
  static async getAllProducts(req, res) {
    const products = await Product.find();

    res.status(200).json({
      products,
    });
  }

  static async addNewProduct(req, res) {
    try {
      const product = new Product(req.body);
      product.store = req.params.storeId;
      await product.save();

      res.status(201).json(product);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = ProductsController;
