import { useState } from "react";
import {
  MicrophoneIcon,
  CalendarIcon,
  TagIcon,
  // CancelIcon,
  EllipsisVerticalIcon,
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import styles from "./dashboard.module.css";
import categories from "@/utils/categories";
export default function AddTransactionInput() {
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    date: "",
    amount: "",
    type: "Income",
    category: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleAddTransaction = () => {
    // Implement transaction addition logic here
    console.log(newTransaction);  
    setNewTransaction({
      description: "",
      date: "",
      amount: "",
      type: "Income",
      category: "",
    });
    setIsOpen(false);
    setIsOpen(true);

  };

  return (
    <div className={styles.inputSection}>
      <form onSubmit={handleAddTransaction} className={styles.transactionForm}>
        <div className={styles.formWrapper}>
          <button type="button" className={styles.plusButton}>
            <PlusIcon className={styles.plusIcon} />
          </button>

          <input
            type="text"
            name="description"
            placeholder="Transaction Description"
            className={styles.input}
            onChange={handleInputChange}
            value={newTransaction.description}
          />

          <input
            type="date"
            name="date"
            className={styles.input}
            onChange={handleInputChange}
            value={newTransaction.date}
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
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
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
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

          <button type="submit" className={styles.addButton}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
