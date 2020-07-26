const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express(); // Lida com rotas, parametros e respostas ao cliente

const server = require('http').Server(app); // Habilitando conexões http
const io = require('socket.io')(server); // Habilitando conexões websocket

// Conectando com o banco (week7:week7) User/password
mongoose.connect('colocar enderço do mongo', {
  useNewUrlParser: true,
});

// Criando próprio midleware, habilitar que a variavel io seja usada em qualquer página.
// finalizando a conexao do web socket
app.use((req, res, next)=> {
  req.io = io;
  next(); // Garante que as próximas linhas sejam executadas
})


app.use(cors()); // Permite que qualquer endereçoo acesso o backend

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

server.listen(3333);