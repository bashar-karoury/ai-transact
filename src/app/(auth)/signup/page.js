'use client'
import { useState } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={styles.signupCard}>
        <h1 className={styles.title}>CREATE ACCOUNT</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.nameFields}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Re-type password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          <button type="submit" className={styles.signupButton}>
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
}
