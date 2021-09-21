const { StatusCodes } = require('http-status-codes');
const userModel = require('../models/userModel');

const createUser = async ({ name, email, password, role }) => {
  const message = await userModel.createUser(
    { name, email, password, role },
  );

  return {
    status: StatusCodes.CREATED,
    message,
  };
};

module.exports = {
  createUser,
};