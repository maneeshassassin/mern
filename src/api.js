import axios from 'axios';


export const api_instance = axios.create({
  baseURL: 'http://localhost:5001',
  headers: {
    'Content-Type': 'application/json',
    'Authorization':''
  }
});