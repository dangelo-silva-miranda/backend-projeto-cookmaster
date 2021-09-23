const express = require('express');
const loginController = require('../controllers/loginController');
const { validateLoginPassword, validateLoginEmail } = require('../middlewares/validations');

const loginRouter = express.Router();

loginRouter.post('/', [validateLoginEmail, validateLoginPassword], loginController.createToken);

module.exports = { loginRouter };