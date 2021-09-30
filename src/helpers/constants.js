const path = require('path');

const MessageCodes = {
  INVALID_ENTRIES: 'Invalid entries. Try again.',
  EMAIL_EXISTS: 'Email already registered',
  REQUIRED_FIELDS: 'All fields must be filled',
  INCORRECT_USERNAME_PASSWORD: 'Incorrect username or password',
  MISSING_AUTH_TOKEN: 'missing auth token',
  JWT_MALFORMED: 'jwt malformed',
};

/* Chave secreta que será usada para encriptar dados do usuário. */
const SECRET = '123deoliveiraquatro';

const IMAGES_PATH = path.join(__dirname, '..', '/uploads');

module.exports = {
  MessageCodes,
  SECRET,
  IMAGES_PATH,
};