'use client'
import { useEffect, useState } from 'react';
import styles from './budget.module.css';
import dashboardstyles from '../dashboard/dashboard.module.css';
import BudgetOptionsPopOver from './BudgetOptionsPopOver';
import categories from "@/utils/categories";
import {
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { flightRouterStateSchema } from 'next/dist/server/app-render/types';
export default function Budget() {
  const [budgetForm, setBudgetForm] = useState({
    category: '',
    amount: "",
  });
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const [activeBudget, setActiveBudget] = useState(null);
  const [editingBudget, setEditingBudget] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [tofetch, setFetch] = useState(flightRouterStateSchema);

  useEffect(() => {
    async function fetchBudgets() {

      try {
        const result = await fetch("/api/budgets");
        if (result.ok) {
          const data = await result.json();
          console.log('result', data);
          setBudgets(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchBudgets();
  }, [tofetch]);


  const addBudgetHandler = async (e) => {
    e.preventDefault();
    if (budgets.some(budget => budget.category === budgetForm.category)) {
      console.error("Error: Duplicate category");
      return;
    }
    if (!budgetForm.category || !budgetForm.amount) {
      console.error("Error: All fields are required");
      return;
    }

    if (budgetForm.amount < 0) {
      console.error("Error: amount can't be less than zero");
      return;
    }
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
      if (result.ok) {
        setFetch(!tofetch);
        console.log("result of adding budget =", result);
      }
      setBudgetForm({
        category: '',
        amount: "",
      });
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

  const editHandleChange = (e) => {
    const { name, value } = e.target;
    console.log('name', name)
    console.log('value', value)
    setEditingBudget(prev => ({
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

  const EditHandler = async () => {

    if (budgets.some(budget => budget.category === editingBudget.category && budget.budget_id !== editingBudget.budget_id)) {
      console.error("Error: Duplicate category");
      return;
    }
    if (!editingBudget.category || !editingBudget.amount) {
      console.error("Error: All fields are required");
      return;
    }

    if (editingBudget.amount < 0) {
      console.error("Error: amount can't be less than zero");
      return;
    }
    // Edit Budget logic Here
    try {
      const response = await fetch("/api/budgets", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingBudget),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        setActiveBudget(editingBudget);
        console.log('Done');
        setFetch(!tofetch);
      }
      setEditingBudget(null);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const CloseHandler = () => {
    setEditingBudget(null);
  }

  return (
    <div className={styles.budgetContainer}>
      <h1 className={styles.title}>Budgets</h1>

      {/* Budget Form */}
      <div className={styles.budgetFormCard}>
        <form className={styles.budgetForm}>
          {/* <div className={styles.formGroup}>
            <input
              type="text"
              name="category"
              value={budgetForm.category}
              onChange={handleChange}
              placeholder="Category"
              className={styles.input}
            />
          </div> */}
          <div className={styles.formGroup}>
            <select
              name="category"
              className={styles.input}
              onChange={handleChange}
              value={budgetForm.category}
            >
              <option value="">Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

          </div>
          <div className={styles.formGroup}>
            <input
              type="number"
              name="amount"
              value={budgetForm.amount}
              onChange={handleChange}
              placeholder="Limit Amount"
              className={styles.input}
              min="0"
            />
          </div>
          <button type="button" onClick={addBudgetHandler} className={styles.addButton}>
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
              <select
                name="category"
                className={styles.input}
                onChange={editHandleChange}
                value={editingBudget.category}
              >
                <option value="">Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {/* <span className={styles.budgetName}>{'amount input'}</span> */}
              <input
                name="amount"
                type="number"
                className={styles.input}
                placeholder="Limit Amount"
                value={editingBudget.amount}
                onChange={editHandleChange}
                min="0"
              />
              <button onClick={EditHandler}> Done </button>
              <button onClick={CloseHandler}> Close </button>
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
        setActiveBudget={setActiveBudget}
        setEditingBudget={setEditingBudget}
        tofetch={tofetch}
        setFetch={setFetch}
      />
    </div >
  );
} 