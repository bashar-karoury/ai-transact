"use client";
import React, { useState, useEffect } from "react";
import styles from "./Reports.module.css";
import PieChart from "./PieChart";
import { useErrorModal } from "@/Components/ModalContext";

const ReportsPage = () => {
  const { showErrorModal } = useErrorModal();
  const [timePeriod, setTimePeriod] = useState("this_month");
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/reports?time=${timePeriod}`);
        const data = await response.json();
        setData(data);

        if (response.ok) {
          setExpenseData(Object.values(data.categorize_expense));
          setIncomeData(Object.values(data.categorize_income));
          setTotalExpenses(data.total_expense);
          setTotalIncomes(data.total_income);
          console.log("reports received data", data);
        } else {
          console.log("Error fetching data:", data.error);
        }
      } catch (error) {
        console.log("Error:", error);
        showErrorModal(`Couldn't fetch reports, try again later`);
      }
    };

    fetchData();
  }, [timePeriod]);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.title}>Reports</h1>
        <div className={styles.filters}>
          <button
            onClick={() => setTimePeriod("today")}
            className={timePeriod === "today" ? styles.active : ""}
          >
            Today
          </button>
          <button
            onClick={() => setTimePeriod("this_month")}
            className={timePeriod === "this_month" ? styles.active : ""}
          >
            Month
          </button>
          <button
            onClick={() => setTimePeriod("this_year")}
            className={timePeriod === "this_year" ? styles.active : ""}
          >
            Year
          </button>
        </div>

        <div className={styles.reportContainer}>
          <div className={styles.reportSection}>
            <div className={styles.chartContainer}>
              <h2 className={styles.heading2}>Expenses</h2>
              <div className={styles.stats}>
                <span className={styles.red}>${totalExpenses}</span>
              </div>
              <PieChart
                data={expenseData}
                labels={Object.keys(data?.categorize_expense || {})}
              />
            </div>
          </div>

          <div className={styles.reportSection}>
            <div className={styles.chartContainer}>
              <h2 className={styles.heading2}>Incomes</h2>
              <div className={styles.stats}>
                <span className={styles.green}>${totalIncomes}</span>
              </div>
              <PieChart
                data={incomeData}
                labels={Object.keys(data?.categorize_income || {})}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
