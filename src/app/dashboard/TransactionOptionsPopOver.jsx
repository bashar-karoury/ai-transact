import styles from "./dashboard.module.css";
import EditTransactionPopOver from "./EditTransactionPopOver";
import {
  MicrophoneIcon,
  CalendarIcon,
  TagIcon,
  PlusIcon,
  EllipsisVerticalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
export default function TranasactionOptionsPopOver({
  transactions,
  popoverPosition,
  showPopover,
  setShowPopover,
  editingTransaction,
  setEditingTransaction,
}) {
  //   const [editingTransaction, setEditingTransaction] = useState(null);
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
                setEditingTransaction(true);
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
