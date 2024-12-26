'use client'
import { useState } from 'react';
import styles from './settings.module.css';

export default function Settings() {
  const [settings, setSettings] = useState({
    currency: '',
    theme: '',
    imageOpt: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.settingsContainer}>
      <h1 className={styles.title}>Settings</h1>
      
      <div className={styles.settingsForm}>
        <div className={styles.formGroup}>
          <label htmlFor="currency">Currency:</label>
          <input
            type="text"
            id="currency"
            name="currency"
            value={settings.currency}
            onChange={handleChange}
            placeholder="Enter currency"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="theme">Theme:</label>
          <input
            type="text"
            id="theme"
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            placeholder="Enter theme"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="imageOpt">Image[opt]:</label>
          <input
            type="text"
            id="imageOpt"
            name="imageOpt"
            value={settings.imageOpt}
            onChange={handleChange}
            placeholder="Enter image options"
          />
        </div>
      </div>
    </div>
  );
} 