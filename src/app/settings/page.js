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

export default function Settings() {
  const [formData, setFormData] = useState({
    currency: 'USD',
    logo: null
  });
  const clickHandler = async () => {
    try {
      const userConfigs = formData;
      console.log(userConfigs);
      const result = await fetch("/api/userSettings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userConfigs),
      });
      console.log("result of editing user settings =", result);
    } catch (error) {
      console.error(`Failed to put user settings to database ${error}`);
    }
  };

  return (
    <div className="profile-container">
      <h1>Settings</h1>

      <form className="onboard-form">
        <div className="form-group">
          <label>Currency</label>
          <select
            value={formData.currency}
            onChange={(e) =>
              setFormData({ ...formData, currency: e.target.value })
            }
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, logo: e.target.files[0] })
            }
          />
        </div>

        <button type="button" onClick={clickHandler} className="submit-btn">
          Save
        </button>
      </form>
    </div >
  );
} 