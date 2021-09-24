const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { SECRET, MessageCodes } = require('../helpers/constants');
const userModel = require('../models/userModel');

const createToken = async ({ email, password }) => {
  if (!await userModel.userEmailExists(email)) {
    return { 
      status: StatusCodes.UNAUTHORIZED, 
      message: { message: MessageCodes.INCORRECT_USERNAME_PASSWORD },
    };
  }

  const dbPassword = await userModel.getPasswordByEmail(email);
  if (password !== dbPassword) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      message: { message: MessageCodes.INCORRECT_USERNAME_PASSWORD }, 
    };
  }

  const { id, role } = await userModel.getIdAndRoleByEmail(email);
  /* expiresIn aceita o tempo de forma bem descritiva: '7d' = 7 dias, '8h' = 8 horas. */
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  /* Assina a mensagem (data), isto é, gera o token utilizando a chave secreta */
  const token = jwt.sign({ data: { id, email, role } }, SECRET, jwtConfig);
  return { status: StatusCodes.OK, message: { token } };
};

module.exports = {
  createToken,
};