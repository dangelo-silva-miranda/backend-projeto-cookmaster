const { StatusCodes } = require('http-status-codes');
const recipeModel = require('../models/recipeModel');
const userModel = require('../models/userModel');

/*
  Material consultado sobre como renomear chave durante desestruturação de objeto
  https://flaviocopes.com/how-to-rename-object-destructuring/
*/
const createRecipe = async (
    { name, ingredients, preparation, user, image = '' }) => {
  const { id: userId, email, role } = user;

  // Buscar o usuário no DB para obter seus dados atualizados    
  const userDB = await userModel.getIdAndRoleByEmail(email);
  
  // Não existe usuário no DB com essas informações
  if (!userDB || userId !== userDB.id || role !== userDB.role) {
    console.log(`userId: ${typeof userId} | userDB.id: ${typeof userDB.id}`);
    return {
      status: StatusCodes.UNAUTHORIZED,
      message: ['non-existent user.'],
    };
  }
  const recipe = await recipeModel.createRecipe(
    { name, ingredients, preparation, userId, image },
  );
  console.log(recipe);
  return {
    status: StatusCodes.CREATED,
    message: { recipe },
  };
};

module.exports = {
  createRecipe,
};