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

module.exports = {
  createRecipe,
};