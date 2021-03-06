const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { MessageCodes, SECRET } = require('../helpers/constants');
const recipeService = require('../services/recipeService');

const validateName = (req, res, next) => {
  const { name = '' } = req.body;

  if (name === '') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: MessageCodes.INVALID_ENTRIES,
    });
  }

  next();
};

const validateIngredients = (req, res, next) => {
  const { ingredients = '' } = req.body;

  if (ingredients === '') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: MessageCodes.INVALID_ENTRIES,
    });
  }

  next();
};

const validatePreparation = (req, res, next) => {
  const { preparation = '' } = req.body;

  if (preparation === '') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: MessageCodes.INVALID_ENTRIES,
    });
  }

  next();
};

const validateEmail = async (req, res, next) => {
  const { email = '' } = req.body;

  const emailPattern = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i;
  if (!emailPattern.test(email)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: MessageCodes.INVALID_ENTRIES,
    });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password = '' } = req.body;

  if (password === '') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: MessageCodes.INVALID_ENTRIES,
    });
  }

  next();
};

const validateLoginEmail = async (req, res, next) => {
  const { email = '' } = req.body;

  if (email === '') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: MessageCodes.REQUIRED_FIELDS,
    });
  }

  const emailPattern = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i;
  if (!emailPattern.test(email)) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: MessageCodes.INCORRECT_USERNAME_PASSWORD,
    });
  }

  next();
};

const validateLoginPassword = async (req, res, next) => {
  const { password = '' } = req.body;

  if (password === '') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: MessageCodes.REQUIRED_FIELDS,
    });
  }

  next();
};

const validateAuth = (req, res, next) => {
  const token = req.headers.authorization || '';

  if (token === '') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: MessageCodes.MISSING_AUTH_TOKEN,
    });
  }

  next();
};

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization || '';
  
  try {
    /* 
      Usa o m??todo verify e a chave secreta para validar e decodificar o JWT.
    */
    const { data } = jwt.verify(token, SECRET);
    req.user = data;

    next();
  } catch (error) {
    // Mensagem informando que o token ?? inv??lido (expirou ou adulterado)
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: MessageCodes.JWT_MALFORMED,
    });
  }
};

const userExists = async (req, res, next) => {
  const { user } = req;
  
  // N??o existe usu??rio no DB com essas informa????es
  if (!await recipeService.userExists(user)) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'non-existent user.',
    });
  }
  
  next();  
};

const isUserAuthorized = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;
  
  if (!await recipeService.isUserAuthorized({ id, user })) {
    return res.status(StatusCodes.FORBIDDEN).json({ 
      message: 'not authorized to perform the requested action', 
    });
  }
  
  next();
};

module.exports = {
  validateName,
  validateIngredients,
  validatePreparation,
  validateEmail,
  validatePassword,
  validateLoginEmail,
  validateLoginPassword,
  validateAuth,
  validateJWT,
  userExists,
  isUserAuthorized,
};