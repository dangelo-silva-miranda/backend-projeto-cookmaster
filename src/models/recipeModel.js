const { ObjectId } = require('mongodb');
const connection = require('./connection');

const isRecipeFromUser = async ({ id, userId }) => {
  const recipe = await connection.getConnection()
    .then((db) => db.collection('recipes')
      .findOne({ _id: ObjectId(id), userId }));
  return recipe !== null;
};

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

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection.getConnection()
    .then((db) => db.collection('recipes')
      .findOne({ _id: ObjectId(id) }, { projection: { image: 0 } }));
};

/*
  Material consultado sobre findOneAndUpdate e returnOriginal
  https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/
  https://stackoverflow.com/a/63683144
*/
const updateRecipeById = async ({ id, name, ingredients, preparation }) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection.getConnection()
    .then((db) => db.collection('recipes')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation } },
        { returnOriginal: false,
          projection: { image: 0 }, 
        },
      ))
    .then(({ value }) => value);
};

const removeRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection.getConnection()
    .then((db) => db.collection('recipes')
      .deleteOne({ _id: ObjectId(id) }));
};

const updateRecipeImageById = async ({ id, image }) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection.getConnection()
    .then((db) => db.collection('recipes')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { image } },
        { returnOriginal: false },
      ))
    .then(({ value }) => value);
};

module.exports = {
  isRecipeFromUser,
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  removeRecipeById,
  updateRecipeImageById,
};