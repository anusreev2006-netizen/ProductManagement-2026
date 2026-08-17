import React, { useEffect, useMemo, useState } from 'react'
import { getOrders, getProducts } from '../services/apiService'
import { Bar } from 'react-chartjs-2'
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Tooltip,Legend,} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Dashboard() {
  const [products,setProducts] = useState([])
  const [orders,setOrders] = useState([])
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)

  useEffect(()=>{
    Promise.all([getProducts(),getOrders()]).then(([ProductsRes,ordersRes])=>{
      setProducts(ProductsRes.data)
      setOrders(ordersRes.data)
      setLoading(false)
    }).catch(()=>{
      setError("Failed to load dashboard data")
      setLoading(false)
    })
    },[])
    const totalProducts = products.length
    const totalOrders = orders.length

    const totalRevenue = useMemo(() =>{
      return orders.reduce((sum,order)=>sum+order.total,0)
    },[orders])
    const outOfStockCount = useMemo(()=>{
      return products.filter((p)=> p.stock === 0).length
    },[products])

    const topProducts = useMemo(()=>{
      return [...products].sort((a,b)=>b.rating - a.rating).slice(0,5)
    },[products])

   const chartData = useMemo(() => {
  const colors = ["#77237b", "#4fda99", "#492267", "#c46b74", "#964567"];
  return {
    labels: topProducts.map((p) => p.name),
    datasets: [
      {
        label: "Rating",
        data: topProducts.map((p) => p.rating),
        backgroundColor: topProducts.map((_, i) => colors[i % colors.length]),
      },
    ],
  };
}, [topProducts]);

    if(loading) return <p>Loading dashboard...</p>
    if(error) return <p className='text-danger'>{error}</p>

 
  return (
       <div>
      <h2>Dashboard</h2>

      <div className="row mt-4 g-3">
        <div className="col-md-3">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h6>Total Products</h6>
              <h3>{totalProducts}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h6>Total Orders</h6>
              <h3>{totalOrders}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <h6>Total Revenue</h6>
              <h3>₹{totalRevenue}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <h6>Out of Stock</h6>
              <h3>{outOfStockCount}</h3>
            </div>
          </div>
        </div>
      </div>

      <h4 className="mt-5">Top 5 Products</h4>
       <div style={{ maxWidth: "700px" }} className="mt-3">
        <Bar data={chartData} />
      </div>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {topProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>₹{product.price}</td>
              <td>{product.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard
