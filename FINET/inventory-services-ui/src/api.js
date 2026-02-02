    
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/inventory/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProducts = () => api.get("products/");

export default api;
