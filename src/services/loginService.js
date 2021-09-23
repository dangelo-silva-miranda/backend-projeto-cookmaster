const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const createToken = ({ email }) => {
  const { id, role } = userModel.getIdAndRoleByEmail(email);

  /* Chave secreta que será usada para encriptar dados do usuário. */
  const secret = '123deoliveiraquatro';

  /* expiresIn aceita o tempo de forma bem descritiva: '7d' = 7 dias, '8h' = 8 horas. */
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  /* 
    Assina a mensagem (data), isto é, gera o token utilizando a chave secreta
  */
  const token = jwt.sign({ data: { id, email, role } }, secret, jwtConfig);

  return {
    status: StatusCodes.OK,
    message: { token },
  };
};

module.exports = {
  createToken,
};