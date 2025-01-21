import { useState } from "react";
import styles from "./dashboard.module.css";
export default function TransactionHeader({ time, setTime = () => {} }) {
  return (
    <div className={styles.transactionHeader}>
      <h3 className={styles.title}>Recent Transactions</h3>
      <div className={styles.timeFilter}>
        <button
          onClick={() => setTime("today")}
          className={time === "today" ? styles.active : ""}
        >
          Today
        </button>
        <button
          onClick={() => setTime("this-week")}
          className={time === "this-week" ? styles.active : ""}
        >
          This Week
        </button>
        <button
          onClick={() => setTime("this-month")}
          className={time === "this-month" ? styles.active : ""}
        >
          This Month
        </button>
      </div>
    </div>
  );
}
