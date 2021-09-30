const bodyParser = require('body-parser');
const express = require('express');
const { IMAGES_PATH } = require('../helpers/constants');

const { loginRouter } = require('../routers/loginRouter');
const { recipeRouter } = require('../routers/recipeRouter');
const { userRouter } = require('../routers/userRouter');

const app = express();
/*
  Material consultado sobre bodyParser.json vs bodyParser.urlencoded
  https://stackoverflow.com/questions/55558402/what-is-the-meaning-of-bodyparser-urlencoded-extended-true-and-bodypar
*/
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

/* Todas as rotas com /users/<alguma-coisa> entram aqui e vão para o roteador */
app.use('/users', userRouter);

/* Todas as rotas com /login/<alguma-coisa> entram aqui e vão para o roteador */
app.use('/login', loginRouter);

/* Todas as rotas com /recipes/<alguma-coisa> entram aqui e vão para o roteador */
app.use('/recipes', recipeRouter);

// /images é o caminho/end-point da API onde as imagens estarão disponíveis
// path.join(__dirname, '..', 'uploads') é o caminho da pasta onde o multer deve salvar suas imagens ao realizar o upload
// a pasta `uploads` está em `./src/uploads` e não deve ser renomeada ou removida (assim como o arquivo `ratinho.jpg`)
app.use('/images', express.static(IMAGES_PATH));

module.exports = app;
