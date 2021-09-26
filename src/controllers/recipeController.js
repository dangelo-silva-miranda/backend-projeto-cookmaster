const recipeService = require('../services/recipeService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { user } = req;
  
  const { status, message } = await recipeService.createRecipe(
    { name, ingredients, preparation, user },
  );

  return res.status(status).json(message);
};

const getAllRecipes = async (_req, res) => {
  const { status, message } = await recipeService.getAllRecipes();

  return res.status(status).json(message);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await recipeService.getRecipeById(id);

  return res.status(status).json(message);
};

const updateRecipeById = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { user } = req;
  
  const { status, message } = await recipeService.updateRecipeById(
    { id, name, ingredients, preparation, user },
  );

  return res.status(status).json(message);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
};