'use client'
import { useEffect, useState } from 'react';
import styles from './dashboard.module.css';
import TransactionsListComponent from './TransactionsListComponent';
import TranasactionOptionsPopOver from './TransactionOptionsPopOver';
import AddTransactionInput from './AddTransactionInput';
import TransactionHeader from './TransactionHeader'

import { flightRouterStateSchema } from 'next/dist/server/app-render/types';
export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [activeTransaction, setActiveTransaction] = useState(null);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState("today");

  const [tofetch, setFetch] = useState(flightRouterStateSchema);

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
    console.log('RE--RENDERING');
    const fetchTransactions = async function (time) {
      try {
        const result = await fetch(`/api/transactions?${time}`);
        console.log('result', result);
        if (result.ok) {
          const data = await result.json();
          // console.log('result', data);
          setTransactions(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchTransactions(time);

  }, [time, tofetch]);

  return (
    <div className={styles.dashboardContainer}>
      <TransactionHeader setTime={setTime} />
      <TransactionsListComponent transactions={transactions} handleOptionsClick={handleOptionsClick} />

      <TranasactionOptionsPopOver activeTransaction={activeTransaction}
        setActiveTransaction={setActiveTransaction}
        transactions={transactions}
        popoverPosition={popoverPosition}
        showPopover={showPopover}
        setShowPopover={setShowPopover}
        tofetch={tofetch}
        setFetch={setFetch}
      />

      <AddTransactionInput tofetch={tofetch}
        setFetch={setFetch} />
    </div>
  );
}

