'use client'
import styles from "./page.module.css";
import SignInForm from "@/Components/AuthComponents/SignInForm";
import SignUpForm from "@/Components/AuthComponents/SignUpForm";
import SignOutButton from "@/Components/AuthComponents/SignOutButton";
import { UserButton } from "@/components/ui/user-button";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Welcome to AI-Transact</h1>
      <UserButton />
      <div className={styles.spacer} />
      
      <div className={styles.authContainer}>
        <SignUpForm styles={styles} />
        <div className={styles.divider}>
          <span className={styles.dividerText}>OR</span>
        </div>
        <SignInForm styles={styles} />
      </div>
      
      <div className={styles.spacer} />
      <SignOutButton styles={styles} />
    </div>
  );
}
