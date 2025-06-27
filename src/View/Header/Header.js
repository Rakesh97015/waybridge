import React from 'react'
import { Link } from 'react-router-dom';

function Header({ cartCount }) {
  return (
    <div>
      <header className="header">
        <div className="logo-placeholder">Logo</div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart{cartCount > 0 && <span className="cart-badge"> ({cartCount})</span>}</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>
    </div>
  )
}

export default Header