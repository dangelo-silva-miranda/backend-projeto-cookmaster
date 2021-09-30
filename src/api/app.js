const bodyParser = require('body-parser');
const express = require('express');

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

module.exports = app;
