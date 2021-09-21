const userService = require('../services/userService');

/*
  Material consultado sobre req.path
  http://expressjs.com/pt-br/api.html#req.path

*/
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { path } = req;
  
  const role = (path.includes('admin')) ? 'admin' : 'user';
  
  const { status, message } = await userService.createUser(
    { name, email, password, role },
   );

  return res.status(status).json({ ...message });
};

module.exports = {
  createUser,
};