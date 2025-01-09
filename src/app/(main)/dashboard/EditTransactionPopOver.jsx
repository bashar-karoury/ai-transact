import styles from "./EditPopOverTransaction.css";
export default function EditTransactionPopOver({
  transactions,
  editingTransaction,
  setEditingTransaction,
  tofetch,
  setFetch,
}) {
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    // Add delete logic here
    console.log(editingTransaction);
    try {
      const response = await fetch("/api/transactions", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingTransaction),
      });
      const data = await response.json();
      console.log("Success:", data);
      // delete transaction from transactions
      const index = transactions.indexOf(editingTransaction);
      if (index !== -1) {
        console.log("Edited Transaction available");
        transactions[index].description = "la bla bla bla";
      }
      // setActiveTransaction(null);
    } catch (error) {
      console.error("Error:", error);
    }
    // setShowPopover(false);

    // Add your update logic here
    setEditingTransaction(null);
    setFetch(!tofetch);
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
                <select
                  name="type"
                  // className={styles.typeSelect}
                  // onChange={handleInputChange}
                  onChange={(e) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      type: e.target.value,
                    })
                  }
                  value={editingTransaction.type}
                >
                  <option value="expense">expense</option>
                  <option value="income">income</option>
                </select>
              </div>
              <div className={styles.formField}>
                <label>Amount:</label>
                <input
                  type="number"
                  value={Math.abs(editingTransaction.amount)}
                  min="0"
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
