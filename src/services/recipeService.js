const { StatusCodes } = require('http-status-codes');
const recipeModel = require('../models/recipeModel');
const userModel = require('../models/userModel');

const userExists = async (user) => {
  const { id: userId, email, role } = user;
  // Buscar o usuário no DB para obter seus dados atualizados    
  const userDB = await userModel.getIdAndRoleByEmail(email);
  
  // Não existe usuário no DB com essas informações
  if (!userDB || userId !== userDB.id || role !== userDB.role) {
    return false;
  }

  return true;
};

/*
  Material consultado sobre como renomear chave durante desestruturação de objeto
  https://flaviocopes.com/how-to-rename-object-destructuring/
*/
const createRecipe = async (
    { name, ingredients, preparation, user, image = '' }) => {
  const { id: userId } = user;

  // Não existe usuário no DB com essas informações
  if (!userExists(user)) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      message: { message: 'non-existent user.' },
    };
  }

  const recipe = await recipeModel.createRecipe(
    { name, ingredients, preparation, userId, image },
  );
  
  return {
    status: StatusCodes.CREATED,
    message: { recipe },
  };
};

const getAllRecipes = async () => {
  const recipes = await recipeModel.getAllRecipes();

  return {
    status: StatusCodes.OK,
    message: recipes,
  };
};

const getRecipeById = async (id) => {
  const recipe = await recipeModel.getRecipeById(id);

  if (!recipe) {
    return {
      status: StatusCodes.NOT_FOUND,
      message: { message: 'recipe not found' },
    };
  }
  
  return {
    status: StatusCodes.OK,
    message: recipe,
  };
};

const updateRecipeById = async ({ id, name, ingredients, preparation, user }) => {
  const { id: userId, role } = user;

  // Não existe usuário no DB com essas informações
  if (!userExists(user)) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      message: { message: 'non-existent user.' },
    };
  }
  
  const isRecipeFromUser = await recipeModel.isRecipeFromUser({ id, userId });
  if (role !== 'admin' && !isRecipeFromUser) {
    return { status: StatusCodes.FORBIDDEN, 
      message: { message: 'not authorized to perform the requested action' } };
  }

  const recipe = await recipeModel.updateRecipeById(
    { id, name, ingredients, preparation },
  );
  
  return { status: StatusCodes.OK, message: recipe };  
};

const removeRecipeById = async ({ id, user }) => {
  const { id: userId, role } = user;

  // Não existe usuário no DB com essas informações
  if (!userExists(user)) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      message: { message: 'non-existent user.' },
    };
  }
  
  const isRecipeFromUser = await recipeModel.isRecipeFromUser({ id, userId });
  if (role !== 'admin' && !isRecipeFromUser) {
    return { status: StatusCodes.FORBIDDEN, 
      message: { message: 'not authorized to perform the requested action' } };
  }

  await recipeModel.removeRecipeById(id);
  
  return { status: StatusCodes.NO_CONTENT }; 
};

const updateRecipeImageById = async ({ id, image }) => {
  const recipe = await recipeModel.updateRecipeImageById({ id, image });
  return { status: StatusCodes.OK, message: recipe };  
};

const isUserAuthorized = async ({ id, user: { id: userId, role } }) => {
  const isRecipeFromUser = await recipeModel.isRecipeFromUser({ id, userId });
  
  return role === 'admin' || isRecipeFromUser;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  removeRecipeById,
  updateRecipeImageById,
  userExists,
  isUserAuthorized,
};