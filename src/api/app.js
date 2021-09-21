const bodyParser = require('body-parser');
const express = require('express');
const { userRouter } = require('../routers/userRouter');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

/* Todas as rotas com /users/<alguma-coisa> entram aqui e vão para o roteador */
app.use('/users', userRouter);

module.exports = app;
