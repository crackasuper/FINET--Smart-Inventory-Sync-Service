
// import { useEffect, useState } from "react";
// import { fetchProducts } from "./api";
// import "bootstrap/dist/css/bootstrap.min.css";

// function App() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProducts()
//       .then(res => {
//         setProducts(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   const getStockBadge = (qty) => {
//     if (qty === 0) {
//       return <span className="badge bg-danger">Out of Stock</span>;
//     }
//     if (qty < 10) {
//       return <span className="badge bg-warning text-dark">Low Stock</span>;
//     }
//     return <span className="badge bg-success">In Stock</span>;
//   };

//   return (
//     <div className="container mt-5">
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h3 className="fw-bold mb-0">Inventory Management</h3>
//           <small className="text-muted">
//             Smart Inventory Sync Service
//           </small>
//         </div>
//       </div>

//       {/* Card */}
//       <div className="card shadow-sm">
//         <div className="card-body">
//           {loading ? (
//             <div className="text-center py-4">
//               <div className="spinner-border text-primary" role="status" />
//             </div>
//           ) : (
//             <table className="table table-hover align-middle">
//               <thead className="table-light">
//                 <tr>
//                   <th>SKU</th>
//                   <th>Product Name</th>
//                   <th>Quantity</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {products.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="text-center text-muted py-4">
//                       No products available
//                     </td>
//                   </tr>
//                 ) : (
//                   products.map(p => (
//                     <tr key={p.id}>
//                       <td className="fw-semibold">{p.sku}</td>
//                       <td>{p.name}</td>
//                       <td>
//                         {p.quantity === 0 ? (
//                           <span className="text-danger fw-bold">0</span>
//                         ) : (
//                           p.quantity
//                         )}
//                       </td>
//                       <td>{getStockBadge(p.quantity)}</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


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

  const totalProducts = products.length;
  const lowStock = products.filter(p => p.quantity > 0 && p.quantity < 10).length;
  const outOfStock = products.filter(p => p.quantity === 0).length;

  const getStatusBadge = (qty) => {
    if (qty === 0) {
      return <span className="badge bg-danger">Out of Stock</span>;
    }
    if (qty < 10) {
      return <span className="badge bg-warning text-dark">Low Stock</span>;
    }
    return <span className="badge bg-success">In Stock</span>;
  };

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      {/* Header */}
      <div className="mb-4 text-center">
        <h2 className="fw-bold mb-1">Inventory Management</h2>
        <p className="text-muted mb-0">
          Smart Inventory Sync Service
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Products</h6>
              <h3 className="fw-bold">{totalProducts}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Low Stock</h6>
              <h3 className="fw-bold text-warning">{lowStock}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Out of Stock</h6>
              <h3 className="fw-bold text-danger">{outOfStock}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" />
            </div>
          ) : (
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>SKU</th>
                  <th>Product Name</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td className="fw-semibold">{p.sku}</td>
                    <td>{p.name}</td>
                    <td className="text-center fw-semibold">
                      {p.quantity === 0 ? (
                        <span className="text-danger">0</span>
                      ) : (
                        p.quantity
                      )}
                    </td>
                    <td className="text-center">
                      {getStatusBadge(p.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
