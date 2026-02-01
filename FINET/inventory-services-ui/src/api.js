
import axios from 'axios';

export const fetchProducts = () => 
    axios.get("http://127.0.0.1:8000/api/inventory/products/"); //use your backend server address here