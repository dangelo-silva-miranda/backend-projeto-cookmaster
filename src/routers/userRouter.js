const express = require('express');
const userController = require('../controllers/userController');
const { validateName, validateEmail, validatePassword } = require('../middlewares/validations');

const userRouter = express.Router();

userRouter.post('/', [validateName, validateEmail, validatePassword], userController.createUser);

module.exports = { userRouter };