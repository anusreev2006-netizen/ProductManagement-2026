import React from 'react'
import { Link, NavLink } from 'react-router-dom'


function Navbar() {
  return (
     <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#1a1a2e" }}>
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/" style={{ letterSpacing: "0.5px" }}>
          🛍️ SimpleGoods
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse text-center" id="navMenu">
          <div className="navbar-nav ms-auto gap-2">
            <NavLink
              className={({ isActive }) =>
                `nav-link px-3 ${isActive ? "fw-bold text-warning" : "text-white"}`
              }
              to="/"
            >
              Dashboard
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-link px-3 ${isActive ? "fw-bold text-warning" : "text-white"}`
              }
              to="/products"
            >
              Products
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-link px-3 ${isActive ? "fw-bold text-warning" : "text-white"}`
              }
              to="/orders"
            >
              Orders
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
