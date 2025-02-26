// services/api.js
import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = async () => {
  const response = await axios.get(`${BASE_URL}/posts`);
  return response.data;
};

export const fetchComments = async () => {
  const response = await axios.get(`${BASE_URL}/comments`);
  return response.data;
};

export const createPost = async (postData) => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify({
      ...postData,
      userId: 1, // JsonPlaceholder requires a userId
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  
  const newPost = await response.json();
  return newPost;
};

export const updatePost = async (id, data) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  
  const updatedPost = await response.json();
  return updatedPost; // This will be the response from the server
};
