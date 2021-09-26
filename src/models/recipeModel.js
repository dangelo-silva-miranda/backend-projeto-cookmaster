// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async ({ name, ingredients, preparation, userId, image }) => (
  connection.getConnection()
    .then((db) => db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId, image }))
    .then(({ insertedId, ops: [result] }) => ({
      name: result.name,
      ingredients: result.ingredients,
      preparation: result.preparation,
      userId: result.userId,
      _id: insertedId,
    }))
  );

  /*
    Material consultado sobre projection
    https://stackoverflow.com/a/50802269
    http://mongodb.github.io/node-mongodb-native/3.5/api/Collection.html#find
  */
const getAllRecipes = async () => connection.getConnection()
  .then((db) => db.collection('recipes')
    .find({}, { projection: { image: 0 } }).toArray());

module.exports = {
  createRecipe,
  getAllRecipes,
};