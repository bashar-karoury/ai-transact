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
              <span className={styles.transactionDescription}>
                {transaction.description}
              </span>
              <span className={styles.transactionCategory}>
                {transaction.category}
              </span>
              <span className={styles.transactionDate}>
                {transaction.date.split("T")[0]}
              </span>
              <span
                className={`${styles.transactionAmount} ${
                  transaction.type === "income" ? styles.income : styles.expense
                }`}
              >
                ${Math.abs(transaction.amount).toLocaleString()}
              </span>
            </div>
            <div className={styles.transactionActions}>
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
