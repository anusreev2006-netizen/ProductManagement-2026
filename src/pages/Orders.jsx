import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getOrders } from '../services/apiService'
import SearchBar from '../components/SearchBar'

function Orders() {

  const [orders,setOrders] = useState([])
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");

   useEffect(() => {
    getOrders()
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load orders");
        setLoading(false);
      });
  }, []);

  const statuses = useMemo(() => {
    const unique = [...new Set(orders.map((o) => o.status))];
    return ["All", ...unique];
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = order.customer
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const sortedOrders = useMemo(() => {
    const sorted = [...filteredOrders];
    if (sortOrder === "newest") {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOrder === "oldest") {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return sorted;
  }, [filteredOrders, sortOrder]);

  const totalAmount = useMemo(() => {
    return sortedOrders.reduce((sum, order) => sum + order.total, 0);
  }, [sortedOrders]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-danger">{error}</p>;


  return (
    <div>
      <h2>Orders</h2>

      <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search orders by customer..."/>

      <div className="d-flex flex-wrap gap-3 mb-3">
        <select
          className="form-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          className="form-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="none">Sort by Date</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <h5>Total Order Amount: ₹{totalAmount}</h5>

     <div className='table-responsive'>    
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th>Items</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.date}</td>
              <td>{order.status}</td>
              <td>₹{order.total}</td>
              <td>{order.items}</td>
              <td>
                <Link to={`/orders/${order.id}`} className="btn btn-sm btn-info">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div> 
    </div>
  )
}

export default Orders
