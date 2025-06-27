import React from 'react';
import './Cart.css';
import Header from './Header/Header';
import { useNavigate } from 'react-router-dom';

function Cart({ cartItems, onRemove,  cartCount }) {
  const navigate = useNavigate();
  const onBack =()=>{
    navigate('/');
  }
  
    return (
    <div className="cart-container">
      <div className="desktop-homepage">
        <Header cartCount={cartCount} />
      </div>
      <div className="cart-content">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <div className="cart-items-list">
            {cartItems.map((item, idx) => (
              <div className="cart-item" key={idx}>
                <img src={process.env.PUBLIC_URL + '/' + item.image} alt={item.title} className="cart-item-img" />
                <div className="cart-item-info">
                  <h4>{item.title}</h4>
                  <p>{item.Address}</p>
                  <span>Type: {item.type}</span>
                  <span>Gender: {item.normal}</span>
                </div>
                <button className="remove-btn" onClick={() => onRemove(idx)}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart; 