const bodyParser = require('body-parser');
const express = require('express');
const { loginRouter } = require('../routers/loginRouter');
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

/* Todas as rotas com /login/<alguma-coisa> entram aqui e vão para o roteador */
app.use('/login', loginRouter);

module.exports = app;
