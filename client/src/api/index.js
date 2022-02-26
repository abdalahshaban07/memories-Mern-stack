import axios from "axios";

const url = "http://localhost:5000/"; //local
// const url = "https://memories-mern-project-app1.herokuapp.com/"; //heroku

const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);

export const fetchPostsBySearch = ({ search, tags }) =>
  API.get(`/posts/search?searchQuery=${search || "none"}&tags=${tags}`);

export const ceatePost = (newPost) => API.post("posts", newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`posts/${id}`);

export const likePost = (id) => API.patch(`posts/${id}/likePost`);

export const signin = (formData) => API.post("user/signin", formData);
export const signup = (formData) => API.post("user/signup", formData);
