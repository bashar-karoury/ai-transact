'use client'
import { useState } from 'react';
import { 
  UserIcon, 
  PaintBrushIcon, 
  CurrencyDollarIcon,
  BellIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function Settings() {
  const [settings, setSettings] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    currency: 'USD',
    theme: 'dark',
    notifications: {
      email: true,
      push: false
    },
    language: 'English'
  });

  return (
    <div className="settings-container">
      <h1>Settings</h1>

      {/* Profile Settings */}
      <section className="settings-section">
        <div className="section-header">
          <UserIcon className="section-icon" />
          <h2>Profile Settings</h2>
        </div>
        <div className="settings-form">
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              value={settings.name}
              onChange={(e) => setSettings({...settings, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={settings.email}
              onChange={(e) => setSettings({...settings, email: e.target.value})}
            />
          </div>
        </div>
      </section>

      {/* Appearance Settings */}
      <section className="settings-section">
        <div className="section-header">
          <PaintBrushIcon className="section-icon" />
          <h2>Appearance</h2>
        </div>
        <div className="settings-form">
          <div className="form-group">
            <label>Theme</label>
            <select 
              value={settings.theme}
              onChange={(e) => setSettings({...settings, theme: e.target.value})}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
          <div className="form-group">
            <label>Language</label>
            <select 
              value={settings.language}
              onChange={(e) => setSettings({...settings, language: e.target.value})}
            >
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
              <option value="Spanish">Spanish</option>
            </select>
          </div>
        </div>
      </section>

      {/* Currency Settings */}
      <section className="settings-section">
        <div className="section-header">
          <CurrencyDollarIcon className="section-icon" />
          <h2>Currency</h2>
        </div>
        <div className="settings-form">
          <div className="form-group">
            <label>Default Currency</label>
            <select 
              value={settings.currency}
              onChange={(e) => setSettings({...settings, currency: e.target.value})}
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Notification Settings */}
      <section className="settings-section">
        <div className="section-header">
          <BellIcon className="section-icon" />
          <h2>Notifications</h2>
        </div>
        <div className="settings-form">
          <div className="form-group checkbox">
            <label>
              <input 
                type="checkbox" 
                checked={settings.notifications.email}
                onChange={(e) => setSettings({
                  ...settings, 
                  notifications: {
                    ...settings.notifications,
                    email: e.target.checked
                  }
                })}
              />
              Email Notifications
            </label>
          </div>
          <div className="form-group checkbox">
            <label>
              <input 
                type="checkbox" 
                checked={settings.notifications.push}
                onChange={(e) => setSettings({
                  ...settings, 
                  notifications: {
                    ...settings.notifications,
                    push: e.target.checked
                  }
                })}
              />
              Push Notifications
            </label>
          </div>
        </div>
      </section>

      <button className="save-button">Save Changes</button>
    </div>
  );
} 