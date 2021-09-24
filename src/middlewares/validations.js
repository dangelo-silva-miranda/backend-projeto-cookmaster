const { StatusCodes } = require('http-status-codes');
const { MessageCodes } = require('../helpers/constants');

const validateName = (req, res, next) => {
  const { name = '' } = req.body;

  if (name === '') {
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

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateLoginEmail,
  validateLoginPassword,
};