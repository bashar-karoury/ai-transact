'use client'
import { useState } from 'react';
import { MicrophoneIcon, CalendarIcon, TagIcon, PlusIcon, EllipsisVerticalIcon, XMarkIcon } from '@heroicons/react/24/outline';
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

  const [activeTransaction, setActiveTransaction] = useState(null);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editPopoverPosition, setEditPopoverPosition] = useState({ x: 0, y: 0 });

  const handleOptionsClick = (transaction, e) => {
    e.stopPropagation();
    setActiveTransaction(transaction);
    setShowPopover(true);
    setPopoverPosition({
      x: e.clientX,
      y: e.clientY
    });
  };

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

  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Add your update logic here
    setEditingTransaction(null);
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
            <div className={styles.transactionActions}>
              <span className={`${styles.transactionAmount} ${
                transaction.amount > 0 ? styles.income : styles.expense
              }`}>
                ${Math.abs(transaction.amount).toLocaleString()}
              </span>
              <button 
                className={styles.optionsButton}
                onClick={(e) => handleOptionsClick(transaction, e)}
              >
                <EllipsisVerticalIcon className={styles.optionsIcon} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showPopover && activeTransaction && (
        <div 
          className={styles.popover}
          style={{
            top: popoverPosition.y,
            left: popoverPosition.x
          }}
        >
          <div className={styles.popoverHeader}>
            <h3>Edit Transaction</h3>
            <button 
              className={styles.closeButton}
              onClick={() => setShowPopover(false)}
            >
              ×
            </button>
          </div>
          <div className={styles.popoverContent}>
            <button className={styles.popoverButton} onClick={() => {
              // Add edit logic here
              setShowPopover(false);
            }}>
              Edit
            </button>
            <button className={styles.popoverButton} onClick={() => {
              // Add delete logic here
              setShowPopover(false);
            }}>
              Delete
            </button>
          </div>
        </div>
      )}

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
              value={newTransaction.description}
              onChange={handleInputChange}
              className={styles.descriptionInput}
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

            <button type="button" className={styles.micButton}>
              <MicrophoneIcon className={styles.micIcon} />
            </button>

            <button type="submit" className={styles.addButton}>
              Add
            </button>
          </div>
        </form>
      </div>

      {/* Edit Transaction Popover */}
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
                  onChange={(e) => setEditingTransaction({
                    ...editingTransaction,
                    description: e.target.value
                  })}
                />
              </div>

              <div className={styles.formField}>
                <label>Amount:</label>
                <input
                  type="number"
                  value={Math.abs(editingTransaction.amount)}
                  onChange={(e) => setEditingTransaction({
                    ...editingTransaction,
                    amount: e.target.value
                  })}
                />
              </div>

              <div className={styles.formField}>
                <label>Date:</label>
                <input
                  type="date"
                  value={editingTransaction.date}
                  onChange={(e) => setEditingTransaction({
                    ...editingTransaction,
                    date: e.target.value
                  })}
                />
              </div>

              <div className={styles.formField}>
                <label>Category:</label>
                <input
                  type="text"
                  value={editingTransaction.category || ''}
                  onChange={(e) => setEditingTransaction({
                    ...editingTransaction,
                    category: e.target.value
                  })}
                />
              </div>

              <div className={styles.formField}>
                <label>Note:</label>
                <textarea
                  value={editingTransaction.note || ''}
                  onChange={(e) => setEditingTransaction({
                    ...editingTransaction,
                    note: e.target.value
                  })}
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
                <button 
                  type="submit" 
                  className={styles.saveButton}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

