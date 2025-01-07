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
import React from "react";
import Link from "next/link";
import styles from "./rootLayout.module.css";
// import styles from "./styles.css";
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
            <h2>120,500 $</h2>
          </div>
        </div>
      </aside>
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
