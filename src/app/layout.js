'use client'
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  CogIcon, 
  BellIcon, 
  WalletIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline';
import styles from './rootLayout.module.css';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  
  // Check if current path is login or signup related
  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/';

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <html lang="en">
      <body>
        <div className={styles.layoutContainer}>
          {/* Static Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.logo}>
              <h1>Ai-Transact</h1>
            </div>
            <nav className={styles.nav}>
              <a href="/dashboard" className={pathname === '/dashboard' ? styles.active : ''}>
                <HomeIcon className={styles.icon} />
                <span>Home</span>
              </a>
              <a href="/settings" className={pathname === '/settings' ? styles.active : ''}>
                <CogIcon className={styles.icon} />
                <span>Settings</span>
              </a>
              <a href="/notifications" className={pathname === '/notifications' ? styles.active : ''}>
                <BellIcon className={styles.icon} />
                <span>Notifications</span>
              </a>
              <a href="/budget" className={pathname === '/budget' ? styles.active : ''}>
                <WalletIcon className={styles.icon} />
                <span>Budget</span>
              </a>
              <a href="/reports" className={pathname === '/reports' ? styles.active : ''}>
                <ChartPieIcon className={styles.icon} />
                <span>Reports</span>
              </a>
            </nav>
            <div className={styles.balance}>
              <p>Balance:</p>
              <h2>$120,498</h2>
            </div>
          </aside>

          {/* Main Content */}
          <main className={styles.mainContent}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
} 