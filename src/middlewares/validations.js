const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { MessageCodes, SECRET } = require('../helpers/constants');

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
      Usa o método verify e a chave secreta para validar e decodificar o JWT.
    */
    const { data } = jwt.verify(token, SECRET);

    req.user = data;

    next();
  } catch (error) {
    // Mensagem informando que o token é inválido (expirou ou adulterado)
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: MessageCodes.JWT_MALFORMED,
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
};