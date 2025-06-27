import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import spaData from "./data";
import Header from "./Header/Header";
import "../App.css";

const categories = [
  { icon: <img src={process.env.PUBLIC_URL + "/Frame (1).png"} alt="Salon" style={{height:32}} />, label: "Salon" },
  { icon: <img src={process.env.PUBLIC_URL + "/Frame (2).png"} alt="SPA" style={{height:32}} />, label: "SPA" },
  { icon: <img src={process.env.PUBLIC_URL + "/Frame (3).png"} alt="Clinic" style={{height:32}} />, label: "Clinic" },
];

// const featured = [
//   {
//     image: "image (1).png",
//     title: "Renew Day Spa",
//     address: "120B, Spline Arcade, Flat No 102...",
//     rating: 4.5,
//     distance: "3.5 km",
//     type: "Unisex",
//     offer: "Flat 10% Off above value of 200"
//   },
//   {
//     image: "image (2).png",
//     title: "Mystical Mantra Spa",
//     address: "120B, Spline Arcade, Flat No 102...",
//     rating: 4.5,
//     distance: "3.5 km",
//     type: "Male",
//     offer: null
//   },
//   {
//     image: "image (3).png",
//     title: "Bodhi Retreat Spa",
//     address: "120B, Spline Arcade, Flat No 102...",
//     rating: 4.5,
//     distance: "3.5 km",
//     type: "Female",
//     offer: "Flat 10% Off above value of 200"
//   },
//   {
//     image: "image (4).png",
//     title: "Eternal Bliss Ayurvedic...",
//     address: "120B, Spline Arcade, Flat No 102...",
//     rating: 4.5,
//     distance: "3.5 km",
//     type: "Unisex",
//     offer: null
//   }
// ];

export default function HomePage({ onItemSelect, cartCount }) {
  // Shared logic for both layouts
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const filteredSpaData = useMemo(() => {
    return spaData.filter((item) => {
      const matchesSearch = searchTerm === "" || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.normal.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = locationTerm === "" || 
        item.Address.toLowerCase().includes(locationTerm.toLowerCase());
      const matchesCategory = selectedCategory === "" || 
        item.type.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesLocation && matchesCategory;
    });
  }, [searchTerm, locationTerm, selectedCategory]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleLocationChange = (e) => setLocationTerm(e.target.value);
  const handleCategoryClick = (category) => setSelectedCategory(selectedCategory === category.label.toLowerCase() ? "" : category.label.toLowerCase());
  const clearFilters = () => { setSearchTerm(""); setLocationTerm(""); setSelectedCategory(""); };
  const handleItemClick = (item) => {
    if (onItemSelect) onItemSelect(item);
    navigate('/item');
  };

  // Bottom nav handler
  const handleNav = (path) => {
    navigate(path);
  };

  return (
    <>
      {/* Desktop Layout */}
      <div className="desktop-homepage">
        <Header cartCount={cartCount} />
        {/* Location and Search */}
        <div className="location-search-row">
          <input className="location-input" placeholder="120B, Spline Arcade..." value={locationTerm} onChange={handleLocationChange} />
          <input className="search-input" placeholder="Search Spa, Services..." value={searchTerm} onChange={handleSearchChange} />
        </div>
        {/* Categories */}
        <div className="categories-row">
          {categories.map((cat) => (
            <div className={`category-card ${selectedCategory === cat.label.toLowerCase() ? 'selected' : ''}`} key={cat.label} onClick={() => handleCategoryClick(cat)}>
              <div className="category-icon">{cat.icon}</div>
              <div className="category-label">{cat.label}</div>
            </div>
          ))}
        </div>
        {/* Clear Filters Button */}
        {(searchTerm || locationTerm || selectedCategory) && (
          <div className="clear-filters">
            <button onClick={clearFilters} className="clear-filters-btn">Clear Filters</button>
            <span className="results-count">{filteredSpaData.length} result{filteredSpaData.length !== 1 ? 's' : ''} found</span>
          </div>
        )}
        {/* Banner */}
        <div className="banner-section">
          <div className="banner-content">
            <h2>PREMIUM MAKEUP</h2>
            <p>Visit our salon today</p>
            <p className="banner-quote">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis."</p>
          </div>
          <div className="banner-image">
            <img src={process.env.PUBLIC_URL + "/image (7).png"} alt="Makeup Banner" />
          </div>
        </div>
        {/* Featured */}
        <div className="featured-section">
          <div className="featured-header">
            <h3>Featured</h3>
            <a href="#" className="view-all">View all &rarr;</a>
          </div>
          <div className="featured-cards">
            {filteredSpaData.length > 0 ? (
              filteredSpaData.map((item, idx) => (
                <div className="featured-card" key={idx} onClick={() => handleItemClick(item)} style={{ cursor: 'pointer' }}>
                  <img src={process.env.PUBLIC_URL + "/" + item.image} alt={item.title} className="featured-img" />
                  <div className="featured-info">
                    <h4>{item.title}</h4>
                    <p>{item.Address}</p>
                    <div className="featured-meta">
                      <span>⭐ {item.rating}</span>
                      <span>{item.distance}</span>
                      <span>{item.normal}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No results found. Try adjusting your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="mobile-homepage">
        {/* Search Bar */}
        <div className="mobile-search-bar">
          <span className="search-icon">🔍</span>
          <input className="mobile-search-input" placeholder="Search Spa, Services..." value={searchTerm} onChange={handleSearchChange} />
        </div>
        {/* Location Bar */}
        <div className="mobile-search-bar" style={{marginTop: 0}}>
          <span className="search-icon">📍</span>
          <input className="mobile-search-input" placeholder="Location..." value={locationTerm} onChange={handleLocationChange} />
        </div>
        {/* Categories */}
        <div className="mobile-category-row">
          {categories.map((cat) => (
            <div className={`mobile-category-card${selectedCategory === cat.label.toLowerCase() ? ' selected' : ''}`} key={cat.label} onClick={() => handleCategoryClick(cat)}>
              <div className="mobile-category-icon">{cat.icon}</div>
              <div className="mobile-category-label">{cat.label}</div>
            </div>
          ))}
        </div>
        {/* Clear Filters Button */}
        {(searchTerm || locationTerm || selectedCategory) && (
          <div className="clear-filters" style={{margin: '0 12px 10px 12px'}}>
            <button onClick={clearFilters} className="clear-filters-btn">Clear Filters</button>
            <span className="results-count">{filteredSpaData.length} result{filteredSpaData.length !== 1 ? 's' : ''} found</span>
          </div>
        )}
        {/* Banner */}
        <div className="mobile-banner">
          <div className="mobile-banner-content">
            <div className="mobile-banner-title">PREMIUM MAKEUP</div>
            <div className="mobile-banner-desc">Visit our salon today</div>
          </div>
          <img src={process.env.PUBLIC_URL + "/image (7).png"} alt="Banner" className="mobile-banner-img" />
        </div>
        {/* Upcoming Appointment
        <div className="mobile-appointment-card">
          <div className="mobile-appointment-row">
            <img src={process.env.PUBLIC_URL + "/image (1).png"} alt="Oasis Spa Haven" className="mobile-appointment-img" />
            <div className="mobile-appointment-info">
              <div className="mobile-appointment-title">Oasis Spa Haven</div>
              <div className="mobile-appointment-details">15 June | 10:30 AM</div>
              <div className="mobile-appointment-address">Lalbagh, Sholinganallur</div>
              <div className="mobile-appointment-type">Unisex</div>
            </div>
          </div>
          <div className="mobile-appointment-actions">
            <button className="mobile-pay-btn">Pay Now</button>
            <span className="mobile-otp">Otp: 1234</span>
            <span className="mobile-timer">01 Hr 30 Mins</span>
          </div>
        </div> */}
        {/* Featured */}
        <div className="mobile-featured-section">
          <div className="mobile-featured-header">
            <span>Featured</span>
            <a href="#" className="mobile-view-all">View all &rarr;</a>
          </div>
          <div className="mobile-featured-scroll">
            {filteredSpaData.length > 0 ? (
              filteredSpaData.map((item, idx) => (
                <div className="mobile-featured-card" key={idx} onClick={() => handleItemClick(item)} style={{ cursor: 'pointer' }}>
                  <img src={process.env.PUBLIC_URL + "/" + item.image} alt={item.title} className="mobile-featured-img" />
                  <div className="mobile-featured-info">
                    <div className="mobile-featured-title-row">
                      <span className="mobile-featured-title">{item.title}</span>
                      <span className="mobile-featured-heart">♡</span>
                    </div>
                    <div className="mobile-featured-address">{item.Address}</div>
                    <div className="mobile-featured-meta">
                      <span>⭐ {item.rating}</span>
                      <span>{item.distance}</span>
                      <span>{item.normal}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No results found. Try adjusting your search criteria.</p>
              </div>
            )}
          </div>
        </div>
        {/* Bottom Navigation */}
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
    </>
  );
} 