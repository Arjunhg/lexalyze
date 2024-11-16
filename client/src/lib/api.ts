import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_NODE_ENV === 'production'
  ? 'https://lexalyze-8950.onrender.com'
  : 'http://localhost:4000';

export const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
  }
})

export const logout = async () => {
    const response  = await api.get('/auth/logout');;
    return response.data;
}