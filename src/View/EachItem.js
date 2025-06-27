import React from 'react';
import './EachItem.css';
import { useNavigate } from 'react-router-dom';

function EachItem({ item, onAddToCart, cartCount }) {
   const navigate = useNavigate();
  const onBack =()=>{
    navigate('/');
  }
  if (!item) {
    return (
      <div className="each-item-container">
        <div className="no-item">
          <p>No item selected</p>
          <button onClick={onBack} className="back-btn">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="each-item-container">
      <div className="item-details">
        <div className="item-header">
          <button onClick={onBack} className="back-btn">← Back</button>
          <h1>{item.title}</h1>
        </div>
        
        <div className="item-content">
          <div className="item-image-section">
            <img 
              src={process.env.PUBLIC_URL + "/" + item.image} 
              alt={item.title} 
              className="item-main-image"
            />
          </div>
          
          <div className="item-info-section">
            <div className="item-basic-info">
              <h2>{item.title}</h2>
              <p className="item-address">📍 {item.Address}</p>
              <div className="item-rating">
                <span className="stars">⭐ {item.rating}</span>
                <span className="distance">📍 {item.distance}</span>
                <span className="type">{item.type.toUpperCase()}</span>
              </div>
              <p className="item-gender">👥 {item.normal}</p>
            </div>
            
            <div className="item-description">
              <h3>About this {item.type}</h3>
              <p>
                Experience premium {item.type} services at {item.title}. 
                Located at {item.Address}, we provide top-quality treatments 
                for {item.normal.toLowerCase()} clients. Our {item.rating}-star rated 
                establishment is just {item.distance} away from your location.
              </p>
            </div>
            
            <div className="item-actions">
              <button className="book-btn" onClick={() => onAddToCart(item)}>Add to cart</button>
              <button className="call-btn">Call Now</button>
              <button className="directions-btn">Get Directions</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EachItem; 