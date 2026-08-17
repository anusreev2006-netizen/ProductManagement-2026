import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductForm from '../components/ProductForm'
import { getProductById, updateProduct } from '../services/apiService'
import { toast } from 'react-toastify'


function EditProduct() {

  const {id} = useParams();
  const navigate = useNavigate();
  const [product,setProduct] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(() =>{
    getProductById(id).then((res) =>{
      setProduct(res.data);
      setLoading(false);
    })
    .catch(() =>{
      setLoading(false);
    });
  }, [id]);

  const handleUpdate = (FormData) => {
      updateProduct(id,FormData).then(() => {
         toast.success("Product updated successfully!");
        navigate("/products")
      })
      .catch(()=>{
        alert("Failed to update product");
      })
    }

    if (loading) return <p>Loding...</p>

  return (
    <div>
      <h2>Edit Product </h2>;
        <ProductForm initialValues={product} onSubmit={handleUpdate} />
    </div>
  )
}

export default EditProduct
