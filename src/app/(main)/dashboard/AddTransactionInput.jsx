import { useState } from "react";
import {
  MicrophoneIcon,
  CalendarIcon,
  TagIcon,
  // PlusIcon,
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
    // console.log(`name=${name} value=${value}`);
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleAddTransaction = async (event) => {
    event.preventDefault();
    // Implement transaction addition logic here
    // POST request to /api/transactions
    const isTransactionValid = Object.values(newTransaction).every(
      (value) => value !== ""
    );

    if (!isTransactionValid) {
      console.error("All fields must be filled out");
      setNewTransaction({
        description: "",
        date: today,
        amount: "",
        type: "income",
        category: "",
      });
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
    console.log(newTransaction);
    setNewTransaction({
      description: "",
      date: new Date().toISOString().split("T")[0],
      amount: "",
      type: "expense",
      category: "",
    });
    setFetch(!tofetch);
    // setIsOpen(false);
    // setIsOpen(true);
  };

  function finishCategorization(output_category) {
    console.log("Finished Categorizing");
    console.log(output_category);
    setNewTransaction({ ...newTransaction, category: output_category });
  }

  const handleTransactionRecorded = (newVoiceTransaction) => {
    console.log("Transaction recorded:", newTransaction);
    const cleanedTransaction = Object.fromEntries(
      Object.entries(newVoiceTransaction).filter(([_, v]) => v != null)
    );
    setNewTransaction({ ...newTransaction, ...cleanedTransaction });
    // fill new transaction fields with the new transaction
    // to do ...
  };

  return (
    <div className={styles.inputSection}>
      <form className={styles.transactionForm}>
        <div className={styles.formWrapper}>
          <button type="button" className={styles.XMarkButton}>
            <XMarkIcon className={styles.XMarkIcon} />
          </button>

          <DescriptionInput
            onFinishCategorization={finishCategorization}
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
            className={styles.input}
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
            className={styles.input}
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

          <RecordTransactionButton
            onTransactionRecorded={handleTransactionRecorded}
          />
          <button
            type="button"
            onClick={handleAddTransaction}
            className={styles.addButton}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
