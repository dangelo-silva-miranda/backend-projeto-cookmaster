const { StatusCodes } = require('http-status-codes');
const userModel = require('../models/userModel');
const { MessageCodes } = require('../helpers/constants');

const createUser = async ({ name, email, password, role }) => {
  const user = await userModel.createUser(
    { name, email, password, role },
  );

  if (await userModel.userEmailExists(email)) {
    return {
      status: StatusCodes.CONFLICT,
      message: { message: MessageCodes.EMAIL_EXISTS },
    };
  }

  return {
    status: StatusCodes.CREATED,
    message: { user },
  };
};

module.exports = {
  createUser,
};