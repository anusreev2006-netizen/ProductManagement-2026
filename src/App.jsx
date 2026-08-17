import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'

import Navbar from './components/Navbar'

import AddProduct from './pages/AddProduct'
import Dashboard from './pages/Dashboard'
import EditProduct from './pages/EditProduct'
import Orders from './pages/Orders'
import ProductDetails from './pages/ProductDetails'
import Products from './pages/Products'
import { ToastContainer } from 'react-toastify'
import OrderDetails from './pages/OrderDetails'
import Footer from './components/Footer'



function App() {



  return (
     <BrowserRouter>
     <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
        </Routes>
      </div>
      <Footer/>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  )
}

export default App
