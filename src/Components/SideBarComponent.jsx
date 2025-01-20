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
import styles from "@/app/rootLayout.module.css";
import NewNotificationsNumberComponent from "@/Components/NNNComponent";
import SignOutButton from "@/Components/SignOutButtonComponent";

export default function SideBarComponent({ children }) {
  const pathname = usePathname();
  const [balance, setBalance] = useState(null);
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [error, setError] = useState(false);
  const [userSettings, setUserSettings] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch("/api/balance");
        if (!res.ok) return;

        const data = await res.json();
        setBalance(data);
      } catch (err) {
        console.error("Error fetching balance:", err);
        setError(true);
      } finally {
        setLoadingBalance(false);
      }
    };
    const fetchUserSettings = async () => {
      try {
        const res = await fetch("/api/userSettings");
        if (!res.ok) return;

        const data = await res.json();
        console.log("user settings, ", data);
        setUserSettings(data);
      } catch (err) {
        console.error("Error fetching userSettings:", err);
        setError(true);
      } finally {
        setLoadingSettings(false);
      }
    };
    fetchBalance();
    fetchUserSettings();
  }, []);

  return (

    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1 className={styles.dancingScriptFont}>Ai-Transact</h1>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Playwrite+IN:wght@100..400&family=Playwrite+VN:wght@100..400&display=swap"
            rel="stylesheet"
          />
          <div className={styles.userInfo}>
            <img
              src={userSettings?.profilePicture || "/userIcon.png"}
              width={30}
              height={30}
            />

            {loadingSettings ? (
              <h2>Loading...</h2>
            ) : error ? (
              <h2>Error</h2>
            ) : (
              <span>{userSettings.email}</span>
            )}
          </div>
        </div>

        <SignOutButton className={styles.signOutButton} />

        <nav className={styles.nav}>
          <Link
            href="/dashboard"
            className={pathname === "/dashboard" ? styles.active : ""}
          >
            <HomeIcon className={styles.icon} />
            <span>Home</span>
          </Link>
          <Link
            href="/settings"
            className={pathname === "/settings" ? styles.active : ""}
          >
            <CogIcon className={styles.icon} />
            <span>Settings</span>
          </Link>
          <Link
            href="/notifications"
            className={pathname === "/notifications" ? styles.active : ""}
          >
            <BellIcon className={styles.icon} />
            <span>Notifications</span>
            <NewNotificationsNumberComponent />
          </Link>
          <Link
            href="/budget"
            className={pathname === "/budget" ? styles.active : ""}
          >
            <WalletIcon className={styles.icon} />
            <span>Budgets</span>
          </Link>
          <Link
            href="/reports"
            className={pathname === "/reports" ? styles.active : ""}
          >
            <ChartPieIcon className={styles.icon} />
            <span>Reports</span>
          </Link>
        </nav>

        <div className={styles.balance}>
          <p>Balance:</p>
          {loadingBalance && loadingSettings ? (
            <h2>Loading...</h2>
          ) : error ? (
            <h2>Error</h2>
          ) : (
            <h2>
              {balance} {userSettings?.currency || "USD"}
            </h2>
          )}
        </div>
      </aside>

      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
