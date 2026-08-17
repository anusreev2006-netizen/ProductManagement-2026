import React, { useEffect, useState } from 'react'


function ProductForm({ initialValues, onSubmit }) {
     const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    rating: "",
    image: "",
  });

   const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

   const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Price must be a positive number";
    if (formData.stock === "" || formData.stock < 0)
      newErrors.stock = "Stock cannot be negative";
    if (formData.rating === "" || formData.rating < 0 || formData.rating > 5)
      newErrors.rating = "Rating must be between 0 and 5";
    return newErrors;
  };

    const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    onSubmit(formData);
  };

   const handleReset = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      rating: "",
      image: "",
    });
    setErrors({});
  };

  
  return (
   <form onSubmit={handleSubmit} className="mt-3">
      <div className="mb-3">
        <label className="form-label">Product Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <small className="text-danger">{errors.name}</small>}
      </div>

       <div className="mb-3">
        <label className="form-label">Category</label>
        <input
          type="text"
          name="category"
          className="form-control"
          value={formData.category}
          onChange={handleChange}
        />
        {errors.category && <small className="text-danger">{errors.category}</small>}
      </div>

       <div className="mb-3">
        <label className="form-label">Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={formData.price}
          onChange={handleChange}
        />
        {errors.price && <small className="text-danger">{errors.price}</small>}
      </div>

       <div className="mb-3">
        <label className="form-label">Stock</label>
        <input
          type="number"
          name="stock"
          className="form-control"
          value={formData.stock}
          onChange={handleChange}
        />
        {errors.stock && <small className="text-danger">{errors.stock}</small>}
      </div>

       <div className="mb-3">
        <label className="form-label">Rating (0-5)</label>
        <input
          type="number"
          step="0.1"
          name="rating"
          className="form-control"
          value={formData.rating}
          onChange={handleChange}
        />
        {errors.rating && <small className="text-danger">{errors.rating}</small>}
      </div>

            <div className="mb-3">
        <label className="form-label">Image URL</label>
        <input
          type="text"
          name="image"
          className="form-control"
          value={formData.image}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary me-2">Submit</button>
      <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>

      </form>
  )
}



export default ProductForm
