const { StatusCodes } = require('http-status-codes');
const userModel = require('../models/userModel');

const createUser = async ({ name, email, role }) => {
  const user = await userModel.createUser(
    { name, email, role },
  );

  return {
    status: StatusCodes.CREATED,
    message: { user },
  };
};

module.exports = {
  createUser,
};