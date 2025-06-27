import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
// import Header from './Header/Header';
import '../App.css';

export default function MobileLayout({ cartCount }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path) => {
    navigate(path);
  };

  return (
    <div className="mobile-homepage">
      <div style={{ minHeight: 'calc(100vh - 56px)' }}>
        <Outlet />
      </div>
      <div className="mobile-bottom-nav">
        <div className={`mobile-bottom-nav-item${location.pathname === '/' ? ' active' : ''}`} onClick={() => handleNav('/')}> 
          <span role="img" aria-label="Home">🏠</span>
          <span>Home</span>
        </div>
        <div className={`mobile-bottom-nav-item${location.pathname === '/cart' ? ' active' : ''}`} onClick={() => handleNav('/cart')}>
          <span role="img" aria-label="Cart">🛒</span>
          <span>Cart</span>
        </div>
        <div className={`mobile-bottom-nav-item${location.pathname === '/login' ? ' active' : ''}`} onClick={() => handleNav('/login')}>
          <span role="img" aria-label="Login">👤</span>
          <span>Login</span>
        </div>
        <div className={`mobile-bottom-nav-item${location.pathname === '/register' ? ' active' : ''}`} onClick={() => handleNav('/register')}>
          <span role="img" aria-label="Register">👤</span>
          <span>Register</span>
        </div>
      </div>
    </div>
  );
} 