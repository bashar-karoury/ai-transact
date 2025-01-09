"use client";
import Head from 'next/head';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div>
      <Head>
        <title>AI-Transact | Smart Financial Transactions</title>
        <meta name="description" content="AI-Transact - Revolutionizing Financial Transactions with AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          {/* <a href="/handler/signin" className={styles.btn}>Sign In</a> */}
          <Link href="/handler/signin" className={styles.btn}> Sign In </Link>
          {/* <a href="/handler/signup" className={styles.btn}>Sign Up</a> */}
          <Link href="/signup" className={styles.btn}> Sign Up </Link>
        </div>
        <h1 className={styles.headerTitle}>AI-Transact</h1>
        <nav className={styles.nav}>
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <h2>Revolutionizing Financial Transactions</h2>
        <p>AI-Powered Solutions for Secure and Smart Payments</p>
        <a href="#features" className={styles.btnPrimary}>Discover More</a>
      </section>

      {/* About Section */}
      <section id="about" className={styles.section}>
        <h3>About AI-Transact</h3>
        <p>AI-Transact leverages artificial intelligence to make financial transactions faster, safer, and smarter. Built for individuals and businesses alike, our platform simplifies payments and streamlines processes with cutting-edge technology.</p>
      </section>

      {/* Features Section */}
      <section id="features" className={`${styles.section} ${styles.bgLight}`}>
        <h3>contributers</h3>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <Image src="/feature1.png" alt="Feature 1" width={100} height={100} />
            <h4>Mohamed abdalla</h4>
            <p>Software engineer - Back-End.</p>
          </div>
          <div className={styles.featureCard}>
            <Image src="/feature2.png" alt="Feature 2" width={100} height={100} />
            <h4>Bashar Alkaroury</h4>
            <p>Software engineer - Back-End.</p>
          </div>
          <div className={styles.featureCard}>
            <Image src="/feature3.png" alt="Feature 3" width={100} height={100} />
            <h4>Minatalla sabri</h4>
            <p>Software engineer - Back-End.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.section}>
        <h3>Contact Us</h3>
        <p>Have questions? Reach out to us today!</p>
        <a href="mailto:support@ai-transact.com" className={styles.btnPrimary}>Email Us</a>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 AI-Transact. All Rights Reserved.</p>
        <div className={styles.socialIcons}>
          <a href="https://github.com/user1" target="_blank" className={styles.icon}>GitHub 1</a>
          <a href="https://github.com/user2" target="_blank" className={styles.icon}>GitHub 2</a>
          <a href="https://github.com/user3" target="_blank" className={styles.icon}>GitHub 3</a>
          <a href="https://linkedin.com/in/user1" target="_blank" className={styles.icon}>LinkedIn 1</a>
          <a href="https://linkedin.com/in/user2" target="_blank" className={styles.icon}>LinkedIn 2</a>
          <a href="https://linkedin.com/in/user3" target="_blank" className={styles.icon}>LinkedIn 3</a>
        </div>
      </footer>
    </div>
  );
}
