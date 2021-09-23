// const { ObjectId } = require('mongodb');

const connection = require('./connection');

const userEmailExists = async (email) => {
  const user = await connection.getConnection()
  .then((db) => db.collection('users').findOne({ email }));

  return user !== null;
};

const getPasswordByEmail = async (email) => {
  const { password } = await connection.getConnection()
  .then((db) => db.collection('users').findOne({ email }, { _id: 0, password: 1 }));
  
  return password;
};

const getIdAndRoleByEmail = async (email) => {
  const idAndRole = await connection.getConnection()
    .then((db) => db.collection('users')
      .findOne({ email }, { id: '$_id', role: 1, _id: 0 }));
  return idAndRole;
};

/*
  Material consultado sobre como remover propriedade de objeto
  https://www.w3schools.com/howto/howto_js_remove_property_object.asp

  Material consultado sobre convenção underscore para chaves de objetos
  https://www.thoughtco.com/and-in-javascript-2037515
  https://forum.kirupa.com/t/js-tip-of-the-day-the-underscore-convention/643076
*/
const createUser = async ({ name, email, password, role }) => connection.getConnection()
.then((db) => db.collection('users')
.insertOne({ name, email, password, role }))
.then(({ ops: [result] }) => {
  const res = { ...result };
  delete res.password;
  return res;
});
/*
  Não funcionou por causa de uma propriedade privada (_id) que não tem método para acessá-la. Como resolver?
  .then(({ ops: [result] }) => (
  { 
    name: result.name, 
    email: result.email, 
    role: result.role,
    _id: result['_id '],
  }
));
*/

module.exports = {
  userEmailExists,
  createUser,
  getPasswordByEmail,
  getIdAndRoleByEmail,
};