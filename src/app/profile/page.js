'use client'
import { useState } from 'react';
import { 
  UserIcon,
  EnvelopeIcon,
  CameraIcon,
  CurrencyDollarIcon,
  PaintBrushIcon,
  BellIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function Profile() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: null,
    currency: 'USD',
    theme: 'dark',
    notifications: {
      email: true,
      push: false,
      monthly: true
    },
    security: {
      twoFactor: false
    }
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({...prev, avatar: reader.result}));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log('Profile update:', profile);
  };

  return (
    <div className="profile-container">
      <h1>Profile Settings</h1>

      <form onSubmit={handleSubmit} className="profile-form">
        {/* Profile Picture Section */}
        <section className="profile-section">
          <h2>Profile Picture</h2>
          <div className="avatar-upload">
            <div className="avatar-preview">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Profile" />
              ) : (
                <UserIcon className="default-avatar" />
              )}
            </div>
            <div className="avatar-edit">
              <label className="upload-button">
                <CameraIcon className="camera-icon" />
                <span>Change Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  hidden
                />
              </label>
            </div>
          </div>
        </section>

        {/* Personal Information */}
        <section className="profile-section">
          <h2>Personal Information</h2>
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-with-icon">
              <UserIcon className="input-icon" />
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <div className="input-with-icon">
              <EnvelopeIcon className="input-icon" />
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
              />
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section className="profile-section">
          <h2>Preferences</h2>
          <div className="form-group">
            <label>Currency</label>
            <div className="input-with-icon">
              <CurrencyDollarIcon className="input-icon" />
              <select
                value={profile.currency}
                onChange={(e) => setProfile({...profile, currency: e.target.value})}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Theme</label>
            <div className="input-with-icon">
              <PaintBrushIcon className="input-icon" />
              <select
                value={profile.theme}
                onChange={(e) => setProfile({...profile, theme: e.target.value})}
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="profile-section">
          <h2>Notifications</h2>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={profile.notifications.email}
                onChange={(e) => setProfile({
                  ...profile,
                  notifications: {
                    ...profile.notifications,
                    email: e.target.checked
                  }
                })}
              />
              <span>Email Notifications</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={profile.notifications.push}
                onChange={(e) => setProfile({
                  ...profile,
                  notifications: {
                    ...profile.notifications,
                    push: e.target.checked
                  }
                })}
              />
              <span>Push Notifications</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={profile.notifications.monthly}
                onChange={(e) => setProfile({
                  ...profile,
                  notifications: {
                    ...profile.notifications,
                    monthly: e.target.checked
                  }
                })}
              />
              <span>Monthly Report</span>
            </label>
          </div>
        </section>

        {/* Security */}
        <section className="profile-section">
          <h2>Security</h2>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={profile.security.twoFactor}
                onChange={(e) => setProfile({
                  ...profile,
                  security: {
                    ...profile.security,
                    twoFactor: e.target.checked
                  }
                })}
              />
              <span>Enable Two-Factor Authentication</span>
            </label>
          </div>
        </section>

        <div className="form-actions">
          <button type="submit" className="save-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
} 