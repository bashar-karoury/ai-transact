'use client'
import { useState } from 'react';
import styles from './page.module.css';

import Link from 'next/link';
import { useStackApp } from "@stackframe/stack";
import { useUser } from "@stackframe/stack"
export default function Login() {

  const user = useUser();
  if (user) {
    window.location.href = '/dashboard';
  }
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const app = useStackApp();

  // if already logged in redirect to dashboard
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!password) {
      setError('Please enter your password');
      return;
    }
    // this will redirect to app.urls.afterSignIn if successful, you can customize it in the StackServerApp constructor
    const result = await app.signInWithCredential({ email, password });
    // It is better to handle each error code separately, but we will just show the error code directly for simplicity here
    if (result.status === 'error') {
      setError(result.error.message);
    }

  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        {/* Logo */}

        {/* <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <Image src="/favicon.ico" alt="Logo" width={100} height={100} />
          </div>
        </div> */}


        {/* Welcome Text */}
        <h1 className={styles.title}>Ai-Transact</h1>
        <p className={styles.subtitle}>Welcome back 👋</p>

        {error}
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
        </form>

        <p className={styles.signupText}>
          Don't have an account? <Link href="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}