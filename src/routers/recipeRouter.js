const express = require('express');
const recipeController = require('../controllers/recipeController');

const { validateName, validateIngredients, 
  validatePreparation, validateJWT, 
  validateAuth, isUserAuthorized, 
  userExists } = require('../middlewares/validations');
  
const recipeRouter = express.Router();

recipeRouter.post('/', 
  [validateName, validateIngredients, validatePreparation, validateJWT], 
  recipeController.createRecipe);

recipeRouter.get('/', recipeController.getAllRecipes);

recipeRouter.put('/:id/image', [validateAuth, validateJWT, 
  userExists, isUserAuthorized],
 recipeController.updateRecipeImageById);

recipeRouter.get('/:id', recipeController.getRecipeById);

recipeRouter.put('/:id', [validateAuth, validateJWT, validateName, 
  validateIngredients, validatePreparation], recipeController.updateRecipeById);

recipeRouter.delete('/:id', [validateAuth, validateJWT], recipeController.removeRecipeById);

module.exports = {
  recipeRouter,
};