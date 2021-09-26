const express = require('express');

const recipeController = require('../controllers/recipeController');
const { validateName, validateIngredients, 
  validatePreparation, validateJWT } = require('../middlewares/validations');

const recipeRouter = express.Router();

recipeRouter.post('/', 
  [validateName, validateIngredients, validatePreparation, validateJWT], 
  recipeController.createRecipe);

module.exports = {
  recipeRouter,
};