import React, { Component } from 'react';

import './App.css';
import axios from 'axios';
import Header from './Header/Header';
import Compose from './Compose/Compose';
import Posts from './Post/Post';
const baseUrl='https://practiceapi.devmountain.com/api/posts'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(baseUrl).then(res =>{
      
      this.setState({
        posts: res.data
      })
    })
  }
  updatePost(id, text) {
    axios.put(`${baseUrl}?id=${id}`,{text}).then(res =>{
      this.setState({
        posts: res.data
      })
    })
  }

  deletePost(id) {
    axios.delete(`${baseUrl}?id=${id}`).then(res => {
      this.setState({
        posts: res.data
      })
    })

  }

  createPost(text) {
    axios.post(`${baseUrl}`,{text}).then(res =>{
      this.setState({
        posts :res.data
      })
    })
  }

  render() {
    const { posts } = this.state;
    // debugger
    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose createPostFn={this.createPost}/>
          {
            posts.map(post =>(
            <Posts 
              deletePostFn={this.deletePost} 
              updatePostFn={this.updatePost} 
              text={post.text} 
              date={post.date} 
              key={post.id} 
              id={post.id}/>))
            }
        </section>
      </div>
    );
  }
}

export default App;
