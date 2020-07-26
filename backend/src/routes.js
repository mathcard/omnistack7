const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig);

// Rota que lista os posts
routes.get('/posts', PostController.index);

// Rota da criação do post, upload.single anea o arquivo
routes.post('/posts', upload.single('image'), PostController.store); 

// Rota do like
routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;