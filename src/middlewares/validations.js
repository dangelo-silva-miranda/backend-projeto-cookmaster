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

const validateLoginEmail = async (req, res, next) => {
  const { email = '' } = req.body;

  if (email === '') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'All fields must be filled',
    });
  }

  const emailPattern = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i;
  if (!emailPattern.test(email) || !await userModel.userEmailExists(email)) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Incorrect username or password',
    });
  }

  next();
};

const validateLoginPassword = async (req, res, next) => {
  const { email, password = '' } = req.body;

  if (password === '') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'All fields must be filled',
    });
  }

  const dbPassword = await userModel.getPasswordByEmail(email);
  if (password !== dbPassword) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Incorrect username or password',
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