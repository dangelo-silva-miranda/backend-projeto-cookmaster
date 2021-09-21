const { StatusCodes } = require('http-status-codes');
const userModel = require('../models/userModel');

const validateName = (req, res, next) => {
  const { name = '' } = req.body;

  if (name === '') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const validateEmail = async (req, res, next) => {
  const { email = '' } = req.body;

  const emailPattern = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i;
  if (!emailPattern.test(email)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Invalid entries. Try again.',
    });
  }
  
  if (await userModel.userEmailExists(email)) {
    return res.status(StatusCodes.CONFLICT).json({
      message: 'Email already registered',
    });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password = '' } = req.body;

  if (password === '') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};