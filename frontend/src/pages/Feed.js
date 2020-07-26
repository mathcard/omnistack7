import React, { Component } from 'react';
import api from '../services/api';
import io from 'socket.io-client';

import './Feed.css';

import more from '../assets/more.png';
import like from '../assets/like.png';
import comment from '../assets/comment.png';
import send from '../assets/send.png';


class Feed extends Component {
  
  // ARMAZENANDO VARIAVEIS ALTERADAS
  state = {
    feed : [],
  };

  // Executa automaticamente qdo componente e colocado em tela
  async componentDidMount(){
    this.registerToSocket(); // Deve ficar habilitado apenas com realtime configurado

    const response = await api.get('posts');

    // Alterando o valor da variavel com os dados da api
    this.setState({ feed: response.data });
  }

  // COLOCANDO EM REAL TIME
  registerToSocket = () => {
    const socket = io('http://localhost:3333');
    
    // Novo post na primeira posiçao
    socket.on('post', newPost => {
      this.setState({ feed: [newPost, ... this.state.feed]});
    })

    // Novo like
    socket.on('like', likedPost => {
      this.setState({
        feed : this.state.feed.map(post =>           // Busca todos os post e coloca no map
          post._id == likedPost._id ? likedPost : post
          // Validando e atualizando o valor do post
        )
      })
    })

  }


  // Curtir - Recebe a chamanda passando id como padrão
  handleLike = id => {
    api.post(`/posts/${id}/like`);
  }

  render(){
    return (
      <section id="post-list">
        { this.state.feed.map(post => (          
          <article key={post._id}>
          { /* Sempre que usar map precisa de uma key*/}
          <header>
            <div className="user-info">
              <span> {post.author}</span>
              <span className="place"> {post.place}</span>
            </div>
            <img src={more} alt="Mais"/>
          </header>
          <img src={`http://localhost:3333/files/${post.image}`} alt="" />
          <footer>
            <div className="actions">
              <button type="button" onClick={() => this.handleLike(post._id)}>
                <img src={like} alt="" />
              </button>              
              <img src={comment} alt="" />
              <img src={send} alt="" />                
            </div>              
            <strong> {post.likes}</strong>
            <p>
              {post.description}
              <span>{post.hashtags}</span>
            </p>
          </footer>
      </article>        
        ))}
        
      </section>
    );
  }
}

export default Feed;