const { GroceryList, Product } = require("../database/models");

class GroceryListController {
  static async getUserGroceryList(req, res) {
    try {
      const groceryList = await GroceryList.findOne({
        user: req.decodedUser._id,
      })
        .populate("products")
        .exec();
      res.status(200).json(groceryList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async addItem(req, res) {
    try {
      const groceryList = await GroceryList.findOne({
        user: req.decodedUser._id,
      });
      const product = await Product.findOne({ _id: req.body.product });

      if (!product) {
        const error = new Error("Product does not exist");
        error.code = 400;
        throw error;
      }

      groceryList.products.push(product._id);
      await (await groceryList.save()).populate('products');
      res.status(201).json(groceryList);
    } catch (error) {
      console.log("error", error);
      res.status(error.code || 500).json({ message: error.message });
    }
  }

  static async removeItem(req, res) {
    try {
      const groceryList = await GroceryList.findOne({
        user: req.decodedUser._id,
      });
      groceryList.products = groceryList.products.filter(
        (id) => id != req.params.productId
      );

      res.status(200).json(await groceryList.save());
    } catch (error) {
      res.status(error.code || 400).json({ message: error.message });
    }
  }

  static async emptyList(req, res) {
    try {
      const groceryList = await GroceryList.findOne({
        user: req.decodedUser._id,
      });
      groceryList.products = [];
      res.status(200).json(await groceryList.save());
    } catch (error) {
      res.status(error.code || 400).json({ message: error.message });
    }
  }
}

module.exports = GroceryListController;
