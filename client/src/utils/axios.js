import axios from 'axios';

const instance = axios.create({
   baseURL: 'http://localhost:3002/api'
});

//вшиваємо в кожний запрос token
instance.interceptors.request.use(config => {
   config.headers.Authorization = window.localStorage.getItem('token');
   return config;
});

export default instance;