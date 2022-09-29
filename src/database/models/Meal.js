const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  mealName: {
    type: String,
    required: true
  },
  intro: String,
  mealImages: Array,
  ingredientMeasurements: Array,
  prepTime: Object,
  cookTime: Object,
  stepSlides: Object,
  productImages: Array,
  productNames: Array,
  productPageUrl: Array,
  url: String,
  chef: String,
  servings: Number,
  instructions: [{ step: Object, image: String }],
  utensilsRequired: Array,
  categories: Array,
  tips: Array,
  calories: Object,
  total_carbs: Object,
  net_carbs: Object,
  fiber: Object,
  fat: Object,
  protein: Object,
});

module.exports = mongoose.model("meal", Schema);
