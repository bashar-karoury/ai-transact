import { useState } from "react";
import {
  MicrophoneIcon,
  CalendarIcon,
  TagIcon,
  EllipsisVerticalIcon,
  XMarkIcon,
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

  const [addMenu, setAddMenu] = useState(true);

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
    <div className={styles.inputSection}>
      <form className={styles.transactionForm}>
        <div className={styles.formWrapper}>
            {/* Add Menu Button */}
             <button
            type="button"
            onClick={() => setAddMenu(false)}
            // className={styles.hiddingButton}
            aria-label="Open menu"
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

          {/* Clear Button before Description Input */}
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
  );
}
