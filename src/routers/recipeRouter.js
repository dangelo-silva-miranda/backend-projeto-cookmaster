const express = require('express');

const recipeController = require('../controllers/recipeController');
const { IMAGES_PATH } = require('../helpers/constants');
const { validateName, validateIngredients, 
  validatePreparation, validateJWT, validateAuth } = require('../middlewares/validations');

const recipeRouter = express.Router();

// /images é o caminho/end-point da API onde as imagens estarão disponíveis
// path.join(__dirname, '..', 'uploads') é o caminho da pasta onde o multer deve salvar suas imagens ao realizar o upload
// a pasta `uploads` está em `./src/uploads` e não deve ser renomeada ou removida (assim como o arquivo `ratinho.jpg`)
recipeRouter.use('/images', express.static(IMAGES_PATH));

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