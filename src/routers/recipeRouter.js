const express = require('express');

const recipeController = require('../controllers/recipeController');

const recipeRouter = express.Router();

recipeRouter.post('/', recipeController.createRecipe);

module.exports = {
  recipeRouter,
};