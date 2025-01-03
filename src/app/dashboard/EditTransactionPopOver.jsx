import styles from "./dashboard.module.css";
export default function EditTransactionPopOver({
  transactions,
  editingTransaction,
  setEditingTransaction,
}) {
  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Add your update logic here
    setEditingTransaction(null);
  };
  return (
    <>
      {editingTransaction && (
        <div className={styles.editPopoverOverlay}>
          <div className={styles.editPopover}>
            <h2 className={styles.editTitle}>Edit Transaction:</h2>

            <form onSubmit={handleEditSubmit} className={styles.editForm}>
              <div className={styles.formField}>
                <label>Description:</label>
                <input
                  type="text"
                  value={editingTransaction.description}
                  onChange={(e) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className={styles.formField}>
                <label>Amount:</label>
                <input
                  type="number"
                  value={Math.abs(editingTransaction.amount)}
                  onChange={(e) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      amount: e.target.value,
                    })
                  }
                />
              </div>

              <div className={styles.formField}>
                <label>Date:</label>
                <input
                  type="date"
                  value={editingTransaction.date}
                  onChange={(e) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      date: e.target.value,
                    })
                  }
                />
              </div>

              <div className={styles.formField}>
                <label>Category:</label>
                <input
                  type="text"
                  value={editingTransaction.category || ""}
                  onChange={(e) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      category: e.target.value,
                    })
                  }
                />
              </div>

              <div className={styles.formField}>
                <label>Note:</label>
                <textarea
                  value={editingTransaction.note || ""}
                  onChange={(e) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      note: e.target.value,
                    })
                  }
                  rows={4}
                />
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={() => setEditingTransaction(null)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.saveButton}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
