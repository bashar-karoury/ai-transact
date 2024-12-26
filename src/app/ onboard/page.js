'use client'
import { useState } from 'react';

export default function Onboard() {
  const [formData, setFormData] = useState({
    name: '',
    currency: 'USD',
    theme: 'dark',
    logo: null
  });

  return (
    <div className="onboard-container">
      <h1>Welcome to AI-Transact</h1>
      <form className="onboard-form">
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Currency</label>
          <select 
            value={formData.currency}
            onChange={(e) => setFormData({...formData, currency: e.target.value})}
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Theme</label>
          <select 
            value={formData.theme}
            onChange={(e) => setFormData({...formData, theme: e.target.value})}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

        <div className="form-group">
          <label>Logo</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setFormData({...formData, logo: e.target.files[0]})}
          />
        </div>

        <button type="submit" className="submit-btn">
          Get Started
        </button>
      </form>
    </div>
  );
}
