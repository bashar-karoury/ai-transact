import { useState } from "react";
import styles from "./dashboard.module.css";
export default function TransactionHeader({ setTime = () => {} }) {
  return (
    <div className={styles.transactionHeader}>
      <h3>Recent Transactions</h3>
      <div className={styles.timeFilter}>
        <button
          className={styles.filterButton}
          onClick={() => setTime("today")}
        >
          Today
        </button>
        <button
          className={styles.filterButton}
          onClick={() => setTime("this-week")}
        >
          This Week
        </button>
        <button
          className={styles.filterButton}
          onClick={() => setTime("this-month")}
        >
          This Month
        </button>
      </div>
    </div>
  );
}



