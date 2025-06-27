import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./View/HomePage";
import RegisterPage from "./View/RegisterPage/RegisterPage";
import LoginPage from "./View/LoginPage/LoginPage";
import EachItem from "./View/EachItem";
import Cart from "./View/Cart";
import MobileLayout from "./View/MobileLayout";
import { useIsMobile } from "./useIsMobile";
import "./App.css";

function AppWrapper() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  const handleBackToHome = () => {
    setSelectedItem(null);
  };

  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
    setSelectedItem(null);
    navigate('/cart');
  };

  const handleRemoveFromCart = (idx) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="App">
      <Routes>
        {isMobile ? (
          <Route element={<MobileLayout cartCount={cart.length} />}>
            <Route path="/" element={<HomePage onItemSelect={handleItemSelect} cartCount={cart.length} />} />
            <Route path="/cart" element={<Cart cartItems={cart} onRemove={handleRemoveFromCart} onBack={handleBackToHome} cartCount={cart.length} />} />
            <Route path="/item" element={<EachItem item={selectedItem} onBack={handleBackToHome} onAddToCart={handleAddToCart} cartCount={cart.length} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        ) : (
          // Desktop routes (no MobileLayout)
          <>
            <Route path="/" element={<HomePage onItemSelect={handleItemSelect} cartCount={cart.length} />} />
            <Route path="/cart" element={<Cart cartItems={cart} onRemove={handleRemoveFromCart} onBack={handleBackToHome} cartCount={cart.length} />} />
            <Route path="/item" element={<EachItem item={selectedItem} onBack={handleBackToHome} onAddToCart={handleAddToCart} cartCount={cart.length} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}
