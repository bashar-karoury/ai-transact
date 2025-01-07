"use client";
import { usePathname } from "next/navigation";
import { UserButton } from "@stackframe/stack";
import { useUser } from "@stackframe/stack";
import {
  HomeIcon,
  CogIcon,
  BellIcon,
  WalletIcon,
  ChartPieIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Link from "next/link";
// import styles from './styles.css';
import styles from "./rootLayout.module.css";
import NewNotificationsNumberComponent from "@/Components/NNNComponent";

function SignOutButton() {
  const user = useUser();
  return user ? (
    <button onClick={() => user.signOut()}>Sign Out</button>
  ) : (
    "Not signed in"
  );
}

export default function SideBarComponent({ children }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/onboard";

  // State to store the balance
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch balance from API
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch("/api/balance"); // Call the API endpoint
        if (!res.ok) throw new Error("Failed to fetch balance");

        const data = await res.json();
        setBalance(data); // Set balance
      } catch (err) {
        console.error("Error fetching balance:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBalance();
  }, []);

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          {/* Logo and title */}
          <div className={styles.logoSection}>
            <h1>Ai-Transact</h1>
          </div>

          {/* User email */}
          <div className={styles.userEmail}>
            <span>menatalla@gmail.com</span>
            {/* <SignOutButton /> */}
          </div>

          {/* Navigation links */}
          <nav className={styles.navigation}>
            <ul>
              <li>
                <Link href="/dashboard">
                  <HomeIcon className={styles.icon} />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/settings">
                  <CogIcon className={styles.icon} />
                  Settings
                </Link>
              </li>
              <li>
                <Link href="/notifications">
                  <BellIcon className={styles.icon} />
                  Notifications
                </Link>
                <NewNotificationsNumberComponent />
              </li>
              <li>
                <Link href="/budget">
                  <WalletIcon className={styles.icon} />
                  Budget
                </Link>
              </li>
              <li>
                <Link href="/reports">
                  <ChartPieIcon className={styles.icon} />
                  Reports
                </Link>
              </li>
            </ul>
          </nav>

          {/* Balance section */}
          <div className={styles.balanceSection}>
            <p>Balance:</p>
            {loading ? (
              <h2>Loading...</h2>
            ) : error ? (
              <h2>Error</h2>
            ) : (
              <h2>{balance} $</h2>
            )}
          </div>
        </div>
      </aside>
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
