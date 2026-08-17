import React from 'react'
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../services/apiService";


function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductById(id)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load product details");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  return (
    <div>
      <img
      src={product.image || "https://placehold.co/300x300?text=No+Image"}
      alt={product.name}
      style={{ width: "250px", height: "250px", objectFit: "cover", borderRadius: "10px" }}
      className="mb-3"
    />
      <h2>{product.name}</h2>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
      <p><strong>Rating:</strong> {product.rating}</p>
      <Link to="/products" className="btn btn-secondary mt-3">Back to Products</Link>
    </div>
  )
}

export default ProductDetails
