import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // altere para seu backend no Render depois
});

export default api;
