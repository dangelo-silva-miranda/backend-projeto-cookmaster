const recipeService = require('../services/recipeService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation, userId } = req.body;

  const { status, message } = await recipeService.createRecipe(
    { name, ingredients, preparation, userId },
  );

  return res.status(status).json({ ...message });
};

module.exports = {
  createRecipe,
};