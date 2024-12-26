'use client'
import { useState } from 'react';
import styles from './dashboard.module.css';
import { 
  HomeIcon, 
  CogIcon, 
  BellIcon, 
  WalletIcon,
  ChartPieIcon,
  UserIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [transactions] = useState([
    { type: 'Salary', amount: 5000, date: '2024-03-01', category: 'Income' },
    { type: 'Rent', amount: -2000, date: '2024-03-05', category: 'Housing' },
    { type: 'Groceries', amount: -300, date: '2024-03-06', category: 'Food' },
  ]);

  const balance = 120498;

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <h1>Ai-Transact</h1>
        </div>
        <nav className={styles.nav}>
          <a href="/dashboard" className={styles.active}>
            <HomeIcon className={styles.icon} />
            <span>Home</span>
          </a>
          <a href="/settings">
            <CogIcon className={styles.icon} />
            <span>Settings</span>
          </a>
          <a href="/notifications">
            <BellIcon className={styles.icon} />
            <span>Notifications</span>
          </a>
          <a href="/budget">
            <WalletIcon className={styles.icon} />
            <span>Budget</span>
          </a>
          <a href="/reports">
            <ChartPieIcon className={styles.icon} />
            <span>Reports</span>
          </a>
        </nav>
        <div className={styles.balance}>
          <p>Balance:</p>
          <h2>${balance.toLocaleString()}</h2>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Transaction Input */}
        <div className={styles.transactionInput}>
          <div className={styles.inputGroup}>
            <input type="text" placeholder="Salary" />
            <input type="number" placeholder="5000" />
            <select>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <button className={styles.addButton}>Add</button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className={styles.transactionList}>
          <h3>Recent Transactions</h3>
          {transactions.map((transaction, index) => (
            <div key={index} className={styles.transaction}>
              <div className={styles.transactionInfo}>
                <span className={styles.transactionType}>{transaction.type}</span>
                <span className={styles.transactionDate}>{transaction.date}</span>
              </div>
              <span className={`${styles.transactionAmount} ${
                transaction.amount > 0 ? styles.income : styles.expense
              }`}>
                ${Math.abs(transaction.amount).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
