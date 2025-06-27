import React, { useState } from 'react';
import './LoginPage.css';
import Header from '../Header/Header';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email: ${formData.email}\nPassword: ${formData.password}`);
  };

  return (
    <div>
      <Header />
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="login-input"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="login-input"
        />

        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
    </div>
  );
}

export default LoginPage;
