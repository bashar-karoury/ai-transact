'use client'
import { useState } from 'react';
import { MicrophoneIcon, CalendarIcon, TagIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/outline';
import styles from './dashboard.module.css';

export default function Dashboard() {
  const [isRecording, setIsRecording] = useState(false);
  const [transaction, setTransaction] = useState({
    description: '',
    amount: '',
    category: 'Income',
    date: ''
  });

  const [transactions] = useState([
    { 
      type: 'Salary',
      amount: 5000,
      date: '2024-03-01'
    },
    { 
      type: 'Rent',
      amount: -2000,
      date: '2024-03-05'
    },
    { 
      type: 'Groceries',
      amount: -300,
      date: '2024-03-06'
    }
  ]);

  const [newTransaction, setNewTransaction] = useState({
    description: '',
    date: '',
    amount: '',
    type: 'Income',
    category: ''
  });

  const categories = [
    'Salary',
    'Food',
    'Transport',
    'Shopping',
    'Entertainment',
    'Bills',
    'Others'
  ];

  const startRecording = async () => {
    try {
      setIsRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      const recordingDiv = document.createElement('div');
      recordingDiv.className = styles.recordingMessage;
      recordingDiv.textContent = 'Recording...';
      document.body.appendChild(recordingDiv);

      mediaRecorder.onstart = () => {
        console.log('Recording started');
      };

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
        document.body.removeChild(recordingDiv);
      };

      setTimeout(() => mediaRecorder.stop(), 5000);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setIsRecording(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleAddTransaction = () => {
    // Implement transaction addition logic here
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.transactionList}>
        <div className={styles.transactionHeader}>
          <h3>Recent Transactions</h3>
          <div className={styles.timeFilter}>
            <button className={styles.filterButton}>Today</button>
            <button className={styles.filterButton}>This Week</button>
            <button className={styles.filterButton}>This Month</button>
          </div>
        </div>
        {transactions.map((transaction, index) => (
          <div key={index} className={styles.transaction}>
            <div className={styles.transactionInfo}>
              <span className={styles.transactionType}>{transaction.type}</span>
              <span className={styles.transactionDate}>{transaction.date}</span>
            </div>
            <span className={`${styles.transactionAmount} ${
              transaction.amount > 0 ? styles.income : styles.expense
            }`}>
              ${Math.abs(transaction.amount).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.inputSection}>
        <form onSubmit={handleAddTransaction} className={styles.transactionForm}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="description"
              placeholder="Transaction Description"
              value={newTransaction.description}
              onChange={handleInputChange}
              className={styles.descriptionInput}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="date"
              name="date"
              value={newTransaction.date}
              onChange={handleInputChange}
              className={styles.dateInput}
            />
            <CalendarIcon className={styles.calendarIcon} />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={newTransaction.amount}
              onChange={handleInputChange}
              className={styles.amountInput}
            />
          </div>

          <div className={styles.inputGroup}>
            <select
              name="type"
              value={newTransaction.type}
              onChange={handleInputChange}
              className={styles.typeSelect}
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <select
              name="category"
              value={newTransaction.category}
              onChange={handleInputChange}
              className={styles.categorySelect}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <TagIcon className={styles.categoryIcon} />
          </div>

          <button type="button" className={styles.micButton}>
            <MicrophoneIcon className={styles.micIcon} />
          </button>

          <button type="submit" className={styles.addButton}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

