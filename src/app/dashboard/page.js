'use client'
import { useEffect, useState } from 'react';
import styles from './dashboard.module.css';
import TransactionsListComponent from './TransactionsListComponent';
import TranasactionOptionsPopOver from './TransactionOptionsPopOver';
import AddTransactionInput from './AddTransactionInput';
import TransactionHeader from './TransactionHeader'
export default function Dashboard() {
  const [transactions] = useState([
    {
      description: 'Receieved 5000 salary',
      category: 'salary',
      type: 'income',
      amount: 5000,
      date: '2024-03-01'
    },
    {
      description: 'Home rent',
      category: 'rent',
      type: 'expense',
      amount: 2000,
      date: '2024-03-05'
    },
    {
      description: 'Apples and Oranges',
      category: 'groceries',
      type: 'expense',
      amount: 300,
      date: '2024-03-06'
    }
  ]);

  const [activeTransaction, setActiveTransaction] = useState(null);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState("today");

  const handleOptionsClick = (transaction, e) => {
    e.stopPropagation();
    setActiveTransaction(transaction);
    setShowPopover(true);
    setPopoverPosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  useEffect(() => {
    // fetch time depending on received time from TransactionHeader
    console.log(time);
  }, [time]);
  return (
    <div className={styles.dashboardContainer}>
      <TransactionHeader setTime={setTime} />
      <TransactionsListComponent transactions={transactions} handleOptionsClick={handleOptionsClick} />

      <TranasactionOptionsPopOver activeTransaction={activeTransaction} transactions={transactions} popoverPosition={popoverPosition} showPopover={showPopover} setShowPopover={setShowPopover} />

      <AddTransactionInput />
    </div>
  );
}

