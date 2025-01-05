'use client';
import React, { useState, useEffect } from 'react';
import styles from './Reports.module.css';
import PieChart from './PieChart';

const ReportsPage = () => {
  const [timePeriod, setTimePeriod] = useState('this_month');
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncomes, setTotalIncomes] = useState(0);

  useEffect(() => {
    // Fetch the data from the API when the timePeriod changes
    const fetchData = async () => {
      try {
        const response = await fetch('/api/expenses-incomes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ time: timePeriod }), // Send the selected time period
        });

        const data = await response.json();

        if (response.ok) {
          // Set the fetched data
          setExpenseData(Object.values(data.categorize_expense));
          setIncomeData(Object.values(data.categorize_income));
          setTotalExpenses(data.total_expense);
          setTotalIncomes(data.total_income);
        } else {
          console.error('Error fetching data:', data.error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [timePeriod]);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>Reports</h1>
        <div className={styles.filters}>
          <button onClick={() => setTimePeriod('today')}>Today</button>
          <button onClick={() => setTimePeriod('this_month')}>Month</button>
          <button onClick={() => setTimePeriod('this_year')}>Year</button>
        </div>

        <div className={styles.reportSection}>
          <h2>Expenses:</h2>
          <PieChart data={expenseData} labels={Object.keys(expenseData)} />
          <div className={styles.total}>Total: ${totalExpenses}</div>
        </div>

        <div className={styles.reportSection}>
          <h2>Incomes:</h2>
          <PieChart data={incomeData} labels={Object.keys(incomeData)} />
          <div className={styles.total}>Total: ${totalIncomes}</div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
