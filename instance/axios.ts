import axios from 'axios';

export default axios.create({
  baseURL: process.env.NEXTAUTH_URL,
  headers: { 'Content-Type': 'application/json', charset: 'utf-8' },
  withCredentials: true,
});
