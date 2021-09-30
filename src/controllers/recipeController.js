const { StatusCodes } = require('http-status-codes');
const path = require('path');
const { uploadSingle } = require('../middlewares/multer');
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

const removeRecipeById = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  const { status, message } = await recipeService.removeRecipeById(
    { id, user },
  );
  
  if (!message) {
    return res.status(status).json(message);
  }
  
  return res.status(status).send();
};

/*
  Material consultado sobre checar tipo do arquivo antes realizar upload
  https://medium.com/dataseries/configuring-express-multer-middleware-and-checking-file-information-497dc7af9eea
  https://github.com/expressjs/multer/issues/336#issuecomment-242906859

  Ver outras dicas:
  https://github.com/expressjs/multer/issues/659
*/
const updateRecipeImageById = async (req, res) => {
  uploadSingle(req, res, async (err) => {
    if (err) {
      const status = Number(err.message);
      
      if (status === StatusCodes.UNSUPPORTED_MEDIA_TYPE) {
        return res.status(status).json({ message: 'unsupported media type' });
      }

      // An unknown error occurred when uploading.
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'unknown error when uploading' });
    }
    
    const { file, params: { id } } = req;
    
    const imageRelativePath = file.path.slice(file.path.indexOf('src'));
    const image = path.join('localhost:3000', imageRelativePath);
    
    const { status, message } = await recipeService.updateRecipeImageById(
       { id, image },
    );
    
    return res.status(status).json(message);
  });
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  removeRecipeById,
  updateRecipeImageById,
};