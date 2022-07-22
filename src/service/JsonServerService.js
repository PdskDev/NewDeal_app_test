import axios from 'axios';

export class PostServices {
  static serverURL = `https://jsonplaceholder.typicode.com`;

  //get all Posts
  static getAllPosts() {
    let dataURL = `${this.serverURL}/posts/`;
    return axios.get(dataURL);
  }

  //Get one Post
  static getOnePost(PostId) {
    let dataURL = `${this.serverURL}/posts/${PostId}`;
    return axios.get(dataURL);
  }

  //Create new Post
  static newPost(post) {
    let dataURL = `${this.serverURL}/posts/`;
    return axios.post(dataURL, post);
  }

  //Update existing Post
  static updatePost(post, postId) {
    let dataURL = `${this.serverURL}/posts/${postId}`;
    return axios.put(dataURL, post);
  }

  //Delete existing Post
  static deletePost(postId) {
    let dataURL = `${this.serverURL}/posts/${postId}`;
    return axios.delete(dataURL);
  }
}
