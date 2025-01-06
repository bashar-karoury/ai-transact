// app/layout.js
"use client";
import { usePathname } from "next/navigation";
import { useUser } from "@stackframe/stack";
import {
  HomeIcon,
  CogIcon,
  BellIcon,
  WalletIcon,
  ChartPieIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import styles from "./rootLayout.module.css";

import NewNotificationsNumberComponent from "@/Components/NNNComponent";
import React from 'react';
import styles from './styles.css';

function SignOutButton() {
  const user = useUser();
  return user ? <button onClick={() => user.signOut()}>Sign Out</button> : "Not signed in";
}

export default function SideBar({ children }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/login" || pathname === "/signup" || pathname === "/"; // this must change

  if (isAuthPage) {
      return <>{children}</>;
    }

  return (
    <div className={styles.container}>
      /* Dashboard Sidebar */
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1>Ai-Transact</h1>
          <div className={styles.userInfo}>
<SignOutButton />

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

        <div className={styles.balance}>
          <p>Balance:</p>
          <h2>120,500 $</h2>
        </div>
      </div> 
      </aside>
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}

export default function SideBarComponent({ children }) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <div className={styles.sidebarHeader}>
            <h2>120,500 $</h2>
          </div>
        </div>
      </aside>
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
