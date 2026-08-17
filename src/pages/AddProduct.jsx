import React from 'react'
import ProductForm from '../components/ProductForm'
import { addProduct } from '../services/apiService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'



function AddProduct() {
    const navigate = useNavigate();

    const handleAdd = (formData) => {
      addProduct(formData)
        .then(() => {
          toast.success("Product added successfully!");
          navigate("/products");
        })
        .catch(() => {
          alert("Failed to add product");
        });
    };
  return (
    <div>
      <h2>Add Product </h2>
      <ProductForm initialValues={null} onSubmit={handleAdd} />
    </div>
  )
}

export default AddProduct
