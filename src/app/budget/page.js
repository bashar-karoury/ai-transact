'use client'
import { useState } from 'react';
import styles from './budget.module.css';

export default function Budget() {
  const [budgetForm, setBudgetForm] = useState({
    category: '',
    limitAmount: '',
    startDate: ''
  });

  const [budgets] = useState([
    { id: 1, name: 'Budget 1' },
    { id: 2, name: 'Budget 2' },
    { id: 3, name: 'Budget 3' }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New budget:', budgetForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudgetForm(prev => ({
      ...prev,
      [name]: value
    }));
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
              name="limitAmount"
              value={budgetForm.limitAmount}
              onChange={handleChange}
              placeholder="Limit Amount"
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="startDate"
              value={budgetForm.startDate}
              onChange={handleChange}
              placeholder="Start date"
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
        {budgets.map((budget) => (
          <div key={budget.id} className={styles.budgetItem}>
            <span className={styles.budgetName}>{budget.name}</span>
            <button className={styles.expandButton}>▼</button>
          </div>
        ))}
      </div>
    </div>
  );
} 