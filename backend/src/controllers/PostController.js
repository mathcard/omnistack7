const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
  // INDEX - Retorna todos posts ordenados pela data de criaçao
  async index(req, res){
    const posts = await Post.find().sort('-createdAt');
    return res.json(posts);
  },

  // STORE - Recebe os dados do arquivo
  async store(req, res){
    const { author, place, description, hashtags } = req.body;
    const { filename: image } = req.file;

    // Definindo imagem como JPG
    const [name] = image.split('.');
    const fileName = `${name}.jpg`;
    
    // Redimensiona a imagem
    await sharp(req.file.path) //file.path é o caminho que a imagem foi salva
      .resize(500)
      .jpeg({ quality: 70})
      .toFile(
        path.resolve(req.file.destination, 'resized', fileName)
      )
    
    // Deletando arquivo original
    fs.unlinkSync(req.file.path); // Deleta a imagem que não redimensinada

    //Salando arquivos no banco de dados
    const post = await Post.create({
      author,
      place, 
      description,
      hashtags,
      image: fileName,
    });

    req.io.emit('post', post); // Atualiza real time
    
    return res.json(post);
  }
};