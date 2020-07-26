import React, { Component } from 'react';
import api from '../services/api';
import './New.css';
class New extends Component {
  state = {
    image: null,
    author: '',
    place: '',
    description: '',
    hashtags: '',
  };
  
  // Enviando dados ao backend
  handleSubmit = async e =>{
    e.preventDefault();

    const data = new FormData();

    data.append('image', this.state.image);
    data.append('author', this.state.author);
    data.append('place', this.state.place);
    data.append('description', this.state.description);
    data.append('hashtags', this.state.hashtags);

    await api.post('posts', data)
    
    // Rediriona a página específica
    this.props.history.push('/');
    
    //console.log(this.state);
  }


  // Salvando a imagem
  handleImageChange = e => {
    this.setState({ image: e.target.files[0]});
  }


  // Salva o valor dos inputs quando alterados e enviar ao state
  handleChange = e => {
    this.setState({ [e.target.name] : [e.target.value] });
  }

  render(){
    return (
      <form id="new-post" onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.handleImageChange} />

        <input type="text" name="author" placeholder="Autor do post" 
          onChange={this.handleChange} value={this.state.author}
        />

        <input type="text" name="place" placeholder="Localização" 
          onChange={this.handleChange} value={this.state.place}
        />

        <input type="text" name="description" placeholder="Descrição" 
          onChange={this.handleChange} value={this.state.description}
        />
      
        <input type="text" name="hashtags" placeholder="Hashtags" 
          onChange={this.handleChange} value={this.state.hashtags}
        />

        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default New;