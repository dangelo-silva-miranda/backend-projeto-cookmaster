const loginService = require('../services/loginService');

const createToken = async (req, res) => {
  const { email, password } = req.body;

  const { status, message } = await loginService.createToken(
    { email, password },
   );
    
   return res.status(status).json(message);
};

module.exports = {
  createToken,
};