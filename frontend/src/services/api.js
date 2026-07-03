import axios from "axios";

const API = axios.create({
  baseURL:  "https://biovote-tpj8.onrender.com/api",
});

export default API;