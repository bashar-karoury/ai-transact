import styles from "./dashboard.module.css";
import {
  MicrophoneIcon,
  CalendarIcon,
  TagIcon,
  PlusIcon,
  EllipsisVerticalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function TransactionsListComponent({
  transactions,
  handleOptionsClick,
}) {
  return (
    <div className={styles.transactionList}>
      <div className={styles.buttonContainer}>
      {transactions.map((transaction, index) => (
        <div key={index} className={styles.transaction}>
          <div className={styles.transactionInfo}>
            <span className={styles.transactionType}>
              {transaction.description}
            </span>
            <span className={styles.transactionType}>
              {transaction.category}
            </span>
            <span className={styles.transactionDate}>{transaction.date}</span>
          </div>
          <div className={styles.transactionActions}>
            <span
              className={`${styles.transactionAmount} ${
                transaction.amount > 0 ? styles.income : styles.expense
              }`}
            >
              ${Math.abs(transaction.amount).toLocaleString()}
            </span>
            <button
              className={styles.optionsButton}
              onClick={(e) => handleOptionsClick(transaction, e)}
            >
            
              <EllipsisVerticalIcon className={styles.optionsIcon} />
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}