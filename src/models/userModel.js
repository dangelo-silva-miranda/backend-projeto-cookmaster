// const { ObjectId } = require('mongodb');

const connection = require('./connection');

const userEmailExists = async (email) => {
  const user = await connection.getConnection()
  .then((db) => db.collection('users').findOne({ email }));

  return user !== null;
};

const createUser = async ({ name, email, role }) => connection.getConnection()
.then((db) => db.collection('users')
.insertOne({ name, email, role }))
.then((result) => result.ops[0]);

module.exports = {
  userEmailExists,
  createUser,
};