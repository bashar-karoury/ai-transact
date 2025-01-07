import styles from "./dashboard.module.css";
import EditTransactionPopOver from "./EditTransactionPopOver";
import { useState } from "react";
export default function TranasactionOptionsPopOver({
  activeTransaction,
  setActiveTransaction,
  transactions,
  popoverPosition,
  showPopover,
  setShowPopover,
  tofetch,
  setFetch,
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
              onClick={async () => {
                // Add delete logic here
                console.log("active transaction", activeTransaction);
                try {
                  const response = await fetch("/api/transactions", {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      transaction_id: activeTransaction.transaction_id,
                    }),
                  });
                  const data = await response.json();
                  console.log("Success:", data);
                  // delete transaction from transactions
                  // const index = transactions.indexOf(activeTransaction);
                  // if (index !== -1) {
                  //   transactions.splice(index, 1);
                  // }
                  setActiveTransaction(null);
                  // we are fetching transactions after successful deleting
                  setFetch(!tofetch);
                } catch (error) {
                  console.error("Error:", error);
                }
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
        tofetch={tofetch}
        setFetch={setFetch}
      />
    </>
  );
}
