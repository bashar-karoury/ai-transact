'use client'
import { useState } from 'react';
import { MicrophoneIcon } from '@heroicons/react/24/outline';
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

      <div className={styles.inputContainer}>
        <div className={styles.plusIconWrapper}>
          <PlusIcon className={styles.plusIcon} />
        </div>
        <input
          type="text"
          placeholder="Transaction Description"
          className={styles.descriptionInput}
          value={transaction.description}
          onChange={(e) => setTransaction({...transaction, description: e.target.value})}
        />
        <input
          type="date"
          className={styles.dateInput}
          value={transaction.date}
          onChange={(e) => setTransaction({...transaction, date: e.target.value})}
        />
        <input
          type="number"
          placeholder="Amount"
          className={styles.amountInput}
          value={transaction.amount}
          onChange={(e) => setTransaction({...transaction, amount: e.target.value})}
        />
        <select
          className={styles.categorySelect}
          value={transaction.category}
          onChange={(e) => setTransaction({...transaction, category: e.target.value})}
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <button 
          className={styles.micButton}
          onClick={startRecording}
          disabled={isRecording}
        >
          <MicrophoneIcon className={`${styles.micIcon} ${isRecording ? styles.recording : ''}`} />
        </button>
        <button className={styles.addButton}>Add</button>
      </div>
    </div>
  );
}

