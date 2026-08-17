import axiosInstance from "../api/axiosInstance";

// Products
export const getProducts = () => axiosInstance.get("/products");
export const getProductById = (id) => axiosInstance.get(`/products/${id}`);
export const addProduct = (data) => axiosInstance.post("/products", data);
export const updateProduct = (id, data) => axiosInstance.put(`/products/${id}`, data);
export const deleteProduct = (id) => axiosInstance.delete(`/products/${id}`);

// Orders
export const getOrders = () => axiosInstance.get("/orders");
export const getOrderById = (id) => axiosInstance.get(`/orders/${id}`);
