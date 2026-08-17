import React from 'react'
import { useState, useEffect,useMemo } from "react";
import { deleteProduct, getProducts } from "../services/apiService";
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';



function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 3;

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
  setCurrentPage(1);
}, [searchTerm, categoryFilter, stockFilter, sortOrder]);

  const categories = useMemo(() => {
  const unique = [...new Set(products.map((p) => p.category))];
  return ["All", ...unique];
  }, [products]);

    const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || product.category === categoryFilter;
      const matchesStock =
        stockFilter === "All" ||
        (stockFilter === "In Stock" && product.stock > 0) ||
        (stockFilter === "Out of Stock" && product.stock === 0);
      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, searchTerm, categoryFilter, stockFilter]);

  const sortedProducts = useMemo(() => {
  const sorted = [...filteredProducts].reverse()
  if (sortOrder === "lowToHigh") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    sorted.sort((a, b) => b.price - a.price);
  }
  return sorted;
}, [filteredProducts, sortOrder]);

const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

const paginatedProducts = useMemo(() => {
  const start = (currentPage - 1) * itemsPerPage;
  return sortedProducts.slice(start, start + itemsPerPage);
}, [sortedProducts, currentPage]);

const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this product?")) {
    deleteProduct(id)
      .then(() => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        
      })
      .catch(() => {
        alert("Failed to delete product");
      });
  }
};

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Products</h2>
      <Link to="/products/add" className="btn btn-success mb-3">+ Add Product</Link>
      <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search products by name..."/>
     <div className="d-flex flex-wrap gap-3 mb-3">
      <select
        className="form-select"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        className="form-select"
        value={stockFilter}
        onChange={(e) => setStockFilter(e.target.value)}
      >
        <option value="All">All Stock</option>
        <option value="In Stock">In Stock</option>
        <option value="Out of Stock">Out of Stock</option>
      </select>

      <select
        className="form-select"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="none">Sort by Price</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
      </select>
    </div>

   <div className='table-responsive'>   
    <table className="table table-bordered mt-3">
     <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <img
                  src={product.image || "https://placehold.co/60x60?text=No+Image"}
                  alt={product.name}
                  style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px" }}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>₹{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.rating}</td>
              <td>
                <Link to={`/products/${product.id}`} className="btn btn-sm btn-info me-2 mb-2">
                  View
                </Link>
                <button
                  className="btn btn-sm btn-danger me-2 mb-2"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
                <Link to={`/products/edit/${product.id}`} className="btn btn-sm btn-warning me-2 mb-2">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
    </table>
    </div>  

        <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
          <button
            className="btn btn-outline-primary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </button>
          <span className="align-self-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-outline-primary"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
      </div>
    </div>
  )
}

export default Products
