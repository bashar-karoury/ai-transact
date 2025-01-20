import { useState } from "react";
import {
  MicrophoneIcon,
  CalendarIcon,
  TagIcon,
  EllipsisVerticalIcon,
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import styles from "./dashboard.module.css";
import categories from "@/utils/categories";
import DescriptionInput from "@/Components/DescriptionInput";
import RecordTransactionButton from "@/Components/RecordTransactionButton";

export default function AddTransactionInput({ tofetch, setFetch }) {
  const today = new Date().toISOString().split("T")[0];
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    date: today,
    amount: "",
    type: "income",
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const [addMenu, setAddMenu] = useState(false);
  const [showInputSection, setShowInputSection] = useState(true);

  const clearTransactionFields = () => {
    setNewTransaction({
      description: "",
      date: today,
      amount: "",
      type: "income",
      category: "",
    });
  };

  const handleAddTransaction = async (event) => {
    event.preventDefault();

    const isTransactionValid = Object.values(newTransaction).every(
      (value) => value !== ""
    );

    if (!isTransactionValid) {
      console.error("All fields must be filled out");
      return;
    }

    if (newTransaction.amount < 0) {
      console.error("Error: amount can't be less than zero");
      return;
    }

    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });
      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }

    setNewTransaction({
      description: "",
      date: today,
      amount: "",
      type: "expense",
      category: "",
    });
    setFetch(!tofetch);
  };

  return (
    <div>
      {/* + Button */}
      <button
        onClick={() => setAddMenu(true)}
        className={styles.floatingAddButton}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#4F46E5',
          border: 'none',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer',
          display: !addMenu ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}
      >
        +
      </button>

      {/* Menu Section */}
      {showInputSection && (
        <div className={styles.menu}>
          {addMenu && (
            <div className={styles.inputSection}>
              <form className={styles.transactionForm}>
                <div className={styles.formWrapper}>
                  {/* Close button */}
                  <button
                    type="button"
                    onClick={() => setAddMenu(false)}
                    aria-label="Close menu"
                  >
                    <XMarkIcon className={styles.XMarkIconButton} />
                  </button>

                  <DescriptionInput
                    value={newTransaction.description}
                    onChangeParent={handleInputChange}
                  />

                  <input
                    type="date"
                    name="date"
                    value={newTransaction.date}
                    onChange={handleInputChange}
                    className={styles.dateInput}
                  />

                  <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    min="0"
                    className={styles.amountInput}
                    onChange={handleInputChange}
                    value={newTransaction.amount}
                  />

                  <select
                    name="type"
                    className={styles.typeSelect}
                    onChange={handleInputChange}
                    value={newTransaction.type}
                  >
                    <option value="expense">expense</option>
                    <option value="income">income</option>
                  </select>

                  <select
                    name="category"
                    className={styles.inputCategory}
                    onChange={handleInputChange}
                    value={newTransaction.category}
                  >
                    <option value="">Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  <RecordTransactionButton />

                  <button
                    type="button"
                    onClick={handleAddTransaction}
                    className={styles.addButton}
                  >
                    Add
                  </button>

                  <button
                    type="button"
                    onClick={clearTransactionFields}
                    className={styles.clearButton}
                    aria-label="Clear transaction"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
