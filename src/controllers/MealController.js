const { Meal } = require("../database/models");

class MealController {
  static async getMeals(req, res) {
    try {
      const meals = await Meal.find({});
      if (!meals) {
        res.status(200).json(meals);
      } else {
        const error = new Error("Something went wrong");
        error.code = 400;
        throw error;
      }
    } catch (error) {
      return res.status(error.code || 500).json({ error: error.message });
    }
  }
}

module.exports = MealController;
