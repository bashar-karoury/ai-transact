'use client'
import { useState } from 'react';
import { MicrophoneIcon, CalendarIcon, TagIcon, PlusIcon, EllipsisVerticalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import styles from './dashboard.module.css';
import TransactionsListComponent from './TransactionsListComponent';
import TranasactionOptionsPopOver from './TransactionOptionsPopOver';
import EditTransactionPopOver from './EditTransactionPopOver';
import AddTransactionInput from './AddTransactionInput';
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

  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.transactionHeader}>
        <h3>Recent Transactions</h3>
        <div className={styles.timeFilter}>
          <button className={styles.filterButton}>Today</button>
          <button className={styles.filterButton}>This Week</button>
          <button className={styles.filterButton}>This Month</button>
        </div>
      </div>
      <TransactionsListComponent transactions={transactions} handleOptionsClick={handleOptionsClick} />


      <TranasactionOptionsPopOver transactions={transactions} popoverPosition={popoverPosition} showPopover={showPopover} setShowPopover={setShowPopover} setEditingTransaction={setEditingTransaction} />

      <AddTransactionInput />

      <EditTransactionPopOver transactions={transactions} editingTransaction={editingTransaction} setEditingTransaction={setEditingTransaction} />
    </div>
  );
}

