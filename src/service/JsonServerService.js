import axios from 'axios';

export class PostServices {
  static serverURL = `https://jsonplaceholder.typicode.com`;

  //get all posts
  static getAllPosts() {
    let dataURL = `${this.serverURL}/posts/`;
    return axios.get(dataURL);
  }
}
