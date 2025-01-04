'use client'
import { useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <Image src="/favicon.ico" alt="Logo" width={100} height={100} />
          </div>
        </div>

        {/* Welcome Text */}
        <h1 className={styles.title}>Ai-Transact</h1>
        <p className={styles.subtitle}>Welcome back 👋</p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.loginButton}>
            Login
          </button>

          <button type="button" className={styles.googleButton}>
            <Image src="/google-icon.png" alt="Google" width={20} height={20} />
            Log in with Google
          </button>
        </form>

        <p className={styles.signupText}>
          Don't have an account? <Link href="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}