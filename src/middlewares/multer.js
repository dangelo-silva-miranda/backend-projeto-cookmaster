const multer = require('multer');
const { StatusCodes } = require('http-status-codes');
const { IMAGES_PATH } = require('../helpers/constants');

const storage = multer.diskStorage({
  destination(_req, _file, callback) {
    return callback(null, IMAGES_PATH);
  },
  filename(req, _file, callback) {
    const { id } = req.params;
    return callback(null, `${id}.jpeg`);
    /* Mantem a mesma extensão original */
    // return callback(null, id + path.extname(file.originalname));
  },
});

/*
  Material consultado sobre erros do multer
  https://github.com/expressjs/multer#error-handling
*/
const fileFilter = (_req, file, callback) => {
  if (file.mimetype !== 'image/jpeg') {
    return callback(new Error(StatusCodes.UNSUPPORTED_MEDIA_TYPE));
  }
  callback(null, true);
};

const FIELD_NAME = 'image';
const MULTER_OPTIONS = {
  storage,
  fileFilter,
};

const uploadSingle = multer(MULTER_OPTIONS).single(FIELD_NAME);

module.exports = {
  uploadSingle,
};