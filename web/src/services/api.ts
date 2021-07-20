import axios from "axios";

const HOST = 'localhost';
const PORT = 3333;

const api = axios.create({
  baseURL: `http://${HOST}:${PORT}/api/v1`
});

export default api;
