import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8081',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
})
