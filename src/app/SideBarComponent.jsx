// app/layout.js
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
import SignOutButtonComponent from "@/Components/SignOutButtonComponent";
export default function SideBarComponent({ children }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/onboard";

  // State to store the balance
  const [balance, setBalance] = useState(null);
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [error, setError] = useState(false);
  const [userSettings, setUserSettings] = useState("");

  // Fetch balance from API
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch("/api/balance"); // Call the API endpoint
        if (!res.ok) return;

        const data = await res.json();
        setBalance(data); // Set balance
      } catch (err) {
        console.error("Error fetching balance:", err);
        setError(true);
      } finally {
        setLoadingBalance(false);
      }
    };
    fetchBalance();
  }, []);

  // Fetch userSettings from API
  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const res = await fetch("/api/userSettings"); // call the API
        if (!res.ok) return;
  
        const data = await res.json();
        setUserSettings(data); // set userSettings
      } catch (err) {
        console.error("Error fetching userSettings:", err);
        setError(true);
      } finally {
        setLoadingSettings(false);
      }
    };
    fetchUserSettings();
  }, []);

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className={styles.container}>
      {/* Dashboard Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1>Ai-Transact</h1>
          <div className={styles.userInfo}>
            {/* <UserIcon className={styles.userIcon} /> */}
            <img
              src={userSettings?.profilePicture || "/default-profile.png"} // Fallback profile image
              className={styles.userIcon}
            />
            {loadingSettings ? (
              <h2>Loading...</h2>
            ) : error ? (
              <h2>Error</h2>
            ) : (
              <span>{userSettings.email}</span>
            )}
            {/* <SignOutButton /> */}
          </div>
        </div>

        <SignOutButtonComponent />

        <nav className={styles.nav}>
          <a
            href="/dashboard"
            className={pathname === "/dashboard" ? styles.active : ""}
          >
            <HomeIcon className={styles.icon} />
            <span>Home</span>
          </a>
          <a
            href="/settings"
            className={pathname === "/settings" ? styles.active : ""}
          >
            <CogIcon className={styles.icon} />
            <span>Settings</span>
          </a>
          <a
            href="/notifications"
            className={pathname === "/notifications" ? styles.active : ""}
          >
            <BellIcon className={styles.icon} />
            <span>Notifications</span>
            <NewNotificationsNumberComponent />
          </a>
          <a
            href="/budget"
            className={pathname === "/budget" ? styles.active : ""}
          >
            <WalletIcon className={styles.icon} />
            <span>Budget</span>
          </a>
          <a
            href="/reports"
            className={pathname === "/reports" ? styles.active : ""}
          >
            <ChartPieIcon className={styles.icon} />
            <span>Reports</span>
          </a>
        </nav>

        {/* Balance section */}
        <div className={styles.balance}>
          <p>Balance:</p>
          {loadingBalance && loadingSettings ? (
            <h2>Loading...</h2>
          ) : error ? (
            <h2>Error</h2>
          ) : (
            <h2>{balance} {userSettings?.currency || "USD"}</h2>
          )}
        </div>

        {/* </div> */}
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
