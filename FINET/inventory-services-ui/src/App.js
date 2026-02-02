
import { useEffect, useState } from "react";
import { fetchProducts } from "./api";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getStockBadge = (qty) => {
    if (qty === 0) {
      return <span className="badge bg-danger">Out of Stock</span>;
    }
    if (qty < 10) {
      return <span className="badge bg-warning text-dark">Low Stock</span>;
    }
    return <span className="badge bg-success">In Stock</span>;
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-0">Inventory Management</h3>
          <small className="text-muted">
            Smart Inventory Sync Service
          </small>
        </div>
      </div>

      {/* Card */}
      <div className="card shadow-sm">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status" />
            </div>
          ) : (
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>SKU</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-4">
                      No products available
                    </td>
                  </tr>
                ) : (
                  products.map(p => (
                    <tr key={p.id}>
                      <td className="fw-semibold">{p.sku}</td>
                      <td>{p.name}</td>
                      <td>
                        {p.quantity === 0 ? (
                          <span className="text-danger fw-bold">0</span>
                        ) : (
                          p.quantity
                        )}
                      </td>
                      <td>{getStockBadge(p.quantity)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
