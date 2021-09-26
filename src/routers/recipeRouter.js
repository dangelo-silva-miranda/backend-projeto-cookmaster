const express = require('express');

const recipeController = require('../controllers/recipeController');
const { validateName, validateIngredients, 
  validatePreparation, validateJWT, validateAuth } = require('../middlewares/validations');

const recipeRouter = express.Router();

recipeRouter.post('/', 
  [validateName, validateIngredients, validatePreparation, validateJWT], 
  recipeController.createRecipe);

recipeRouter.get('/', recipeController.getAllRecipes);

recipeRouter.get('/:id', recipeController.getRecipeById);

recipeRouter.put('/:id', [validateAuth, validateJWT, validateName, 
  validateIngredients, validatePreparation], recipeController.updateRecipeById);

recipeRouter.delete('/:id', [validateAuth, validateJWT], recipeController.removeRecipeById);

module.exports = {
  recipeRouter,
};