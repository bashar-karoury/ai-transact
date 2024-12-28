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

  const balance = 12500;
// catogary + // Date 

  return (
    <div className={styles.dashboardContainer}>
      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Transaction Input */} {/* catogary + Date */}
        <div className={styles.transactionInput}>
          <div className={styles.inputGroup}>
            <input type="text" placeholder="Description" />
            <input type="number" placeholder="Amount" />
            <input type="date" placeholder="Date" />
            <input type="text" placeholder="Category" />
            <select>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <button className={styles.addButton}>Add</button>
          </div>
        </div>

        {/* Recent Transactions */} {/* adding catogary */}
        {/*<input type="month" placeholder="Date" />*/}
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
