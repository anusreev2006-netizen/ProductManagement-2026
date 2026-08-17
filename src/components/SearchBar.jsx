import React from 'react'

function SearchBar({ value, onChange,placeholder = "Search..." }) {
  return (
     <input
      type="text"
      className="form-control mb-3"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default SearchBar
