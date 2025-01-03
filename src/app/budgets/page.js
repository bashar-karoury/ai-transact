'use client'
import { useState } from 'react';
import {
  PlusIcon,
  TrashIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

export default function Budget() {
  const [budgets, setBudgets] = useState([
    { id: 1, category: 'Shopping', limit: 500, spent: 350 },
    { id: 2, category: 'Food', limit: 400, spent: 280 },
    { id: 3, category: 'Transportation', limit: 200, spent: 150 },
    { id: 4, category: 'Entertainment', limit: 300, spent: 200 }
  ]);

  const [newBudget, setNewBudget] = useState({
    category: '',
    limit: ''
  });

  const addBudget = (e) => {
    e.preventDefault();
    if (newBudget.category && newBudget.limit) {
      setBudgets([...budgets, {
        id: Date.now(),
        category: newBudget.category,
        limit: parseFloat(newBudget.limit),
        spent: 0
      }]);
      setNewBudget({ category: '', limit: '' });
    }
  };

  const deleteBudget = (id) => {
    setBudgets(budgets.filter(budget => budget.id !== id));
  };

  const calculateProgress = (spent, limit) => {
    return (spent / limit) * 100;
  };

  return (
    <div className="budget-container">
      <div className="budget-header">
        <h1>Budget Management</h1>
        <div className="budget-summary">
          <div className="summary-card">
            <ChartBarIcon className="summary-icon" />
            <div>
              <h3>Total Budget</h3>
              <p>$1,400</p>
            </div>
          </div>
          <div className="summary-card">
            <ArrowTrendingDownIcon className="summary-icon spent" />
            <div>
              <h3>Total Spent</h3>
              <p>$980</p>
            </div>
          </div>
          <div className="summary-card">
            <ArrowTrendingUpIcon className="summary-icon remaining" />
            <div>
              <h3>Remaining</h3>
              <p>$420</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Budget Form */}
      <form className="add-budget-form" onSubmit={addBudget}>
        <input
          type="text"
          placeholder="Category"
          value={newBudget.category}
          onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Limit"
          value={newBudget.limit}
          onChange={(e) => setNewBudget({ ...newBudget, limit: e.target.value })}
        />
        <button type="submit">
          <PlusIcon className="icon" />
          Add Budget
        </button>
      </form>

      {/* Budget List */}
      <div className="budget-list">
        {budgets.map(budget => (
          <div key={budget.id} className="budget-item">
            <div className="budget-info">
              <div className="budget-header">
                <h3>{budget.category}</h3>
                <button
                  className="delete-button"
                  onClick={() => deleteBudget(budget.id)}
                >
                  <TrashIcon className="icon" />
                </button>
              </div>
              <div className="budget-details">
                <p>Spent: ${budget.spent} of ${budget.limit}</p>
                <p className="remaining">
                  Remaining: ${budget.limit - budget.spent}
                </p>
              </div>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{
                    width: `${calculateProgress(budget.spent, budget.limit)}%`,
                    backgroundColor: calculateProgress(budget.spent, budget.limit) > 80 ? '#f44336' : '#4caf50'
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
