const { StatusCodes } = require('http-status-codes');
const recipeModel = require('../models/recipeModel');

const createRecipe = async ({ name, ingredients, preparation, 
  userId, image = '' }) => {
  const recipe = await recipeModel.createRecipe(
    { name, ingredients, preparation, userId, image },
  );

  return {
    status: StatusCodes.CREATED,
    message: { recipe },
  };
};

module.exports = {
  createRecipe,
};