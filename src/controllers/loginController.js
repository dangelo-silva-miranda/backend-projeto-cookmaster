const loginService = require('../services/loginService');

const createToken = (req, res) => {
  const { email } = req.body;

  const { status, message } = loginService.createToken(
    { email },
   );

   return res.status(status).json(message);
};

module.exports = {
  createToken,
};