const router = require("express").Router();
const MealController = require("../controllers/MealController");

router.get("/", MealController.getMeals);

module.exports = router;
