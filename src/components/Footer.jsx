import React from 'react'

function Footer() {
  return (
     <footer className="mt-5 py-4" style={{ backgroundColor: "#1a1a2e", color: "#ccc" }}>
      <div className="container text-center">
        <p className="mb-1">© {new Date().getFullYear()} SimpleGoods. All rights reserved.</p>
        
      </div>
    </footer>
  )
}

export default Footer
