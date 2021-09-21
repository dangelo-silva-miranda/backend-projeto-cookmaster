const { MongoClient } = require('mongodb');
require('dotenv').config();

let connection = null;

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/Cookmaster';

const DB_NAME = 'Cookmaster';

const getConnection = async () => {
  connection = connection || await MongoClient.connect(MONGO_DB_URL, OPTIONS)
  .then((conn) => conn.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

  return connection;
};

module.exports = {
  getConnection,
};