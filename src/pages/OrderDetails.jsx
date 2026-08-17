import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOrderById } from '../services/apiService'

function OrderDetails() {
    const {id} = useParams()
    const [order,setOrder] = useState(null)
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(null)

    useEffect(()=>{
        getOrderById(id).then((res)=>{
            setOrder(res.data)
            setLoading(false)
        })
        .catch(()=>{
            setError("Failed to load order detailes")
            setLoading(false)
        })
    },[id])

    if(loading) return <p>Loading...</p>
    if(error) return <p className='text-danger'>{error}</p>
  return (
    <div>
       <h2>Order #{order.id}</h2>
      <p><strong>Customer:</strong> {order.customer}</p>
      <p><strong>Date:</strong> {order.date}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Items:</strong> {order.items}</p>
      <p><strong>Total:</strong> ₹{order.total}</p>
      <Link to="/orders" className="btn btn-secondary mt-3">Back to Orders</Link>
    </div>
  )
}

export default OrderDetails
