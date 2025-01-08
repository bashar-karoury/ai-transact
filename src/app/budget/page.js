'use client'
import { useState } from 'react';
import styles from './budget.module.css';
import dashboardstyles from '../dashboard/dashboard.module.css';
import BudgetOptionsPopOver from './BudgetOptionsPopOver';
import {
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
export default function Budget() {
  const [budgetForm, setBudgetForm] = useState({
    category: '',
    amount: "",
  });
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const [activeBudget, setActiveBudget] = useState(null);
  const [editingBudget, setEditingBudget] = useState(null);
  const [budgets] = useState([

    {
      budget_id: 1,
      category: 'Utilities',
      amount: 100
    },
    {
      budget_id: 2,
      category: 'Groceries',
      amount: 100
    },
    {
      budget_id: 3,
      category: 'Entertainment',
      amount: 100
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('New budget:', budgetForm);
    try {
      const Budget = budgetForm;
      const result = await fetch("/api/budgets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Budget),
      });
      console.log("result of adding budget =", result);
    } catch (error) {
      console.error(`Failed to add budget to database ${error}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('name', name)
    console.log('value', value)
    setBudgetForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  // const handleOptionsClick = (index) => {
  //   const options = document.getElementById(`options-${index}`);
  //   // options.style.display = options.style.display === 'block' ? 'none' : 'block';
  // };

  const handleOptionsClick = (budget, e) => {
    e.stopPropagation();
    setActiveBudget(budget);
    setShowPopover(true);
    setPopoverPosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  return (
    <div className={styles.budgetContainer}>
      <h1 className={styles.title}>Budgets</h1>

      {/* Budget Form */}
      <div className={styles.budgetFormCard}>
        <form onSubmit={handleSubmit} className={styles.budgetForm}>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="category"
              value={budgetForm.category}
              onChange={handleChange}
              placeholder="Category"
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="number"
              name="amount"
              value={budgetForm.amount}
              onChange={handleChange}
              placeholder="Limit Amount"
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.addButton}>
            Add
          </button>
        </form>
      </div>

      {/* Budgets List */}
      <div className={styles.budgetsList}>
        {budgets.map((budget, index) => (
          (editingBudget && editingBudget.budget_id === budget.budget_id ?
            <div key={index} className={styles.budgetItem}>
              {/* <span className={styles.budgetName}>{'category input'}</span> */}
              <input type="text" className={styles.input} placeholder="Category" value={budgetForm.category} onChange={handleChange} />
              {/* <span className={styles.budgetName}>{'amount input'}</span> */}
              <input type="number" className={styles.input} placeholder="Limit Amount" value={budgetForm.amount} onChange={handleChange} />
              <button onClick={() => {

                console.log('Done');
                setEditingBudget(null)
              }
              }> Done </button>
            </div>
            :
            < div key={index} className={styles.budgetItem} >
              <span className={styles.budgetName}>{budget.category}</span>
              <span className={styles.budgetName}>{budget.amount}</span>
              <button
                className={dashboardstyles.optionsButton}
                onClick={(e) => handleOptionsClick(budget, e)}
              >
                <EllipsisVerticalIcon className={dashboardstyles.optionsIcon} />
              </button>
              {/* <button onClick={handleOptionsClick} className={styles.expandButton}>▼</button> */}
            </div>
          )
        ))}

      </div>

      <BudgetOptionsPopOver
        popoverPosition={popoverPosition}
        showPopover={showPopover}
        setShowPopover={setShowPopover}
        activeBudget={activeBudget}
        setEditingBudget={setEditingBudget}
      // activeTransaction={activeTransaction}
      // setActiveTransaction={setActiveTransaction}
      // transactions={transactions}
      // popoverPosition={popoverPosition}
      // showPopover={true}
      // setShowPopover={setShowPopover}
      // tofetch={tofetch}
      // setFetch={setFetch}
      />
    </div >
  );
} 