import styles from "./dashboard.module.css";
import EditTransactionPopOver from "./EditTransactionPopOver";
import { useState } from "react";
export default function TranasactionOptionsPopOver({
  activeTransaction,
  transactions,
  popoverPosition,
  showPopover,
  setShowPopover,
}) {
  const [editingTransaction, setEditingTransaction] = useState(null);
  return (
    <>
      {showPopover && (
        <div
          className={styles.popover}
          style={{
            top: popoverPosition.y,
            left: popoverPosition.x,
          }}
        >
          <div className={styles.popoverHeader}>
            <h3>Edit Transaction</h3>
            <button
              className={styles.closeButton}
              onClick={() => {
                setShowPopover(false);
              }}
            >
              ×
            </button>
          </div>
          <div className={styles.popoverContent}>
            <button
              className={styles.popoverButton}
              onClick={() => {
                // Add edit logic here
                setEditingTransaction(activeTransaction);
                setShowPopover(false);
              }}
            >
              Edit
            </button>
            <button
              className={styles.popoverButton}
              onClick={() => {
                // Add delete logic here
                // delete transaction from transactions
                transactions.splice(
                  transactions.findIndex(
                    (transaction) => transaction.id === activeTransaction.id
                  ),
                  1
                );
              
                setShowPopover(false);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
      <EditTransactionPopOver
        transactions={transactions}
        editingTransaction={editingTransaction}
        setEditingTransaction={setEditingTransaction}
      />
    </>
  );
}
