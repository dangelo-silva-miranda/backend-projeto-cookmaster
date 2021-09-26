// const { ObjectId } = require('mongodb');

const connection = require('./connection');

const userEmailExists = async (email) => {
  const user = await connection.getConnection()
  .then((db) => db.collection('users').findOne({ email }));
  return user !== null;
};

const getPasswordByEmail = async (email) => {
  const { password } = await connection.getConnection()
  .then((db) => db.collection('users')
    .findOne({ email }, { projection: { password: 1, _id: 0 } }));
  
  return password;
};

/*
  Material consultado sobre $toString dentro de projection
  https://www.titanwolf.org/Network/q/97cbd2ef-6014-40f2-aecb-a74d1a617aa4/y
*/
const getIdAndRoleByEmail = async (email) => {
  const idAndRole = await connection.getConnection()
    .then((db) => db.collection('users')
      .findOne({ email }, { projection: { id: { $toString: '$_id' }, role: 1, _id: 0 } }));
      // .findOne({ email }).project({ id: '$_id', role: 1, _id: 0 }));
  
  return idAndRole;
  /*
    O material consultado sugere .project , mas não funciona. Pq?
    https://stackoverflow.com/a/51732851
    .findOne({ email }).project({ id: '$_id', role: 1, _id: 0 })

    O material consultado sugere projection e funciona
    https://stackoverflow.com/a/50802269
    http://mongodb.github.io/node-mongodb-native/3.5/api/Collection.html#findOne
    .findOne({ email }, { projection: { id: '$_id', role: 1, _id: 0 } })
  */
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
  .then(({ insertedId, ops: [result] }) => ({
    name: result.name, 
    email: result.email, 
    role: result.role,
    _id: insertedId,
  }));

/*
  Não funcionou por causa de uma propriedade privada (_id) que não tem método para acessá-la. Como resolver?
  // versão 1 - excluir apenas a chave desnecessária pois password não está encriptado como um app real
  .then(({ ops: [result] }) => {
    const res = { ...result };
    delete res.password;
    return res;
  });

  // versão 2 - montar objeto com as chaves desejadas e usando insertedId para recuperar _id
  .then(({ insertedId, ops: [result] }) => ({ 
    name: result.name, 
    email: result.email, 
    role: result.role,
    _id: result.insertedId.toString(),
  }));  
*/

module.exports = {
  userEmailExists,
  createUser,
  getPasswordByEmail,
  getIdAndRoleByEmail,
};