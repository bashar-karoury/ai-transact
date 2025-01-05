import { useState } from "react";
import {
  MicrophoneIcon,
  CalendarIcon,
  TagIcon,
  PlusIcon,
  EllipsisVerticalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import styles from "./dashboard.module.css";
import categories from "@/utils/categories";
import DescriptionInput from "@/Components/DescriptionInput";
import RecordTransactionButton from "@/Components/RecordTransactionButton";
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

  const handleAddTransaction = (event) => {
    event.preventDefault();
    // Handle the form data here
    console.log("hahahah stopped you");
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
      <form onSubmit={handleAddTransaction} className={styles.transactionForm}>
        <div className={styles.formWrapper}>
          <button type="button" className={styles.plusButton}>
            <PlusIcon className={styles.plusIcon} />
          </button>

          <DescriptionInput
            onFinishCategorization={finishCategorization}
            value={newTransaction.description}
            onChangeParent={handleInputChange}
          />
          {/* <input
            type="text"
            name="description"
            placeholder="Transaction Description"
            value={newTransaction.description}
            onChange={handleInputChange}
            className={styles.descriptionInput}
          /> */}

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
            value={newTransaction.amount}
            onChange={handleInputChange}
            className={styles.amountInput}
          />

          <select
            name="category"
            value={newTransaction.category}
            onChange={handleInputChange}
            className={styles.categorySelect}
          >
            <option value="">Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* <button type="button" className={styles.micButton}>
            <MicrophoneIcon className={styles.micIcon} />
          </button> */}
          <RecordTransactionButton
            onTransactionRecorded={handleTransactionRecorded}
          />
          <button type="submit" className={styles.addButton}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
