import { useEffect, useState } from "react";
import { fetchProducts } from "./api";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(res => setProducts(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Inventory Dashboard</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Product</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} className={p.quantity < 10 ? "table-warning" : ""}>
              <td>{p.sku}</td>
              <td>{p.name}</td>
              <td>{p.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
