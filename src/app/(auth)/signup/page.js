'use client'
import { useState } from 'react';
import { 
  UserIcon,
  EnvelopeIcon, 
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    currency: 'USD'
  });
  
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false
  });

  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Handle signup logic here
    console.log('Signup attempt:', formData);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h1>Create Account</h1>
          <p>Get started with AI-Transact</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-with-icon">
              <UserIcon className="input-icon" />
              <input
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <div className="input-with-icon">
              <EnvelopeIcon className="input-icon" />
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <LockClosedIcon className="input-icon" />
              <input
                type={showPassword.password ? "text" : "password"}
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword({...showPassword, password: !showPassword.password})}
              >
                {showPassword.password ? (
                  <EyeSlashIcon className="toggle-icon" />
                ) : (
                  <EyeIcon className="toggle-icon" />
                )}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <div className="input-with-icon">
              <LockClosedIcon className="input-icon" />
              <input
                type={showPassword.confirm ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword({...showPassword, confirm: !showPassword.confirm})}
              >
                {showPassword.confirm ? (
                  <EyeSlashIcon className="toggle-icon" />
                ) : (
                  <EyeIcon className="toggle-icon" />
                )}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Preferred Currency</label>
            <div className="input-with-icon">
              <CurrencyDollarIcon className="input-icon" />
              <select
                value={formData.currency}
                onChange={(e) => setFormData({...formData, currency: e.target.value})}
                required
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>
          </div>

          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                required
              />
              <span>I accept the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a></span>
            </label>
          </div>

          <button type="submit" className="signup-button" disabled={!acceptTerms}>
            Create Account
          </button>
        </form>

        <div className="signup-footer">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
} 