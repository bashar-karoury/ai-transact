'use client'
import { useState } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import { useStackApp } from "@stackframe/stack";
import { useUser } from "@stackframe/stack"
export default function SignUp() {

  const user = useUser();
  if (user) {
    window.location.href = '/dashboard';
  }
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const app = useStackApp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;
    if (!password) {
      setError('Please enter your password');
      return;
    }
    if (password !== confirmPassword) {
      setError("passwords aren't the same");
      return;
    }
    // this will redirect to app.urls.afterSignIn if successful, you can customize it in the StackServerApp constructor
    const result = await app.signUpWithCredential({ email, password });
    // It is better to handle each error code separately, but we will just show the error code directly for simplicity here
    if (result.status === 'error') {
      setError(result.error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.signupCard}>
        <h1 className={styles.title}>CREATE ACCOUNT</h1>
        {error}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Re-type password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>

          <button type="submit" className={styles.signupButton}>
            SIGN UP
          </button>
        </form>
        <p className={styles.signupText}>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}