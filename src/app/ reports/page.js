'use client'
import { useState } from 'react';
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  ChartBarIcon,
  ChartPieIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

export default function Reports() {
  const [dateRange, setDateRange] = useState('month');
  const [reportData] = useState({
    income: 8500,
    expenses: 3500,
    categories: [
      { name: 'Shopping', amount: 1200, percentage: 35 },
      { name: 'Food', amount: 800, percentage: 25 },
      { name: 'Transport', amount: 500, percentage: 15 },
      { name: 'Entertainment', amount: 600, percentage: 15 },
      { name: 'Others', amount: 400, percentage: 10 }
    ],
    monthlyData: [
      { month: 'Jan', income: 7500, expenses: 3000 },
      { month: 'Feb', income: 8000, expenses: 3200 },
      { month: 'Mar', income: 8500, expenses: 3500 }
    ]
  });

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1>Financial Reports</h1>
        <div className="date-filter">
          <CalendarIcon className="calendar-icon" />
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="summary-card income">
          <div className="card-header">
            <h3>Total Income</h3>
            <ArrowUpIcon className="card-icon" />
          </div>
          <p className="amount">${reportData.income}</p>
          <p className="change positive">+12% from last month</p>
        </div>

        <div className="summary-card expenses">
          <div className="card-header">
            <h3>Total Expenses</h3>
            <ArrowDownIcon className="card-icon" />
          </div>
          <p className="amount">${reportData.expenses}</p>
          <p className="change negative">+5% from last month</p>
        </div>

        <div className="summary-card savings">
          <div className="card-header">
            <h3>Net Savings</h3>
            <ChartBarIcon className="card-icon" />
          </div>
          <p className="amount">${reportData.income - reportData.expenses}</p>
          <p className="change positive">+20% from last month</p>
        </div>
      </div>

      {/* Expense Categories */}
      <div className="report-section">
        <div className="section-header">
          <h2>Expense Categories</h2>
          <ChartPieIcon className="section-icon" />
        </div>
        <div className="categories-list">
          {reportData.categories.map(category => (
            <div key={category.name} className="category-item">
              <div className="category-info">
                <h4>{category.name}</h4>
                <p>${category.amount}</p>
              </div>
              <div className="category-bar">
                <div 
                  className="category-progress"
                  style={{ width: `${category.percentage}%` }}
                ></div>
              </div>
              <span className="category-percentage">{category.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Comparison */}
      <div className="report-section">
        <div className="section-header">
          <h2>Monthly Comparison</h2>
          <ChartBarIcon className="section-icon" />
        </div>
        <div className="monthly-data">
          {reportData.monthlyData.map(data => (
            <div key={data.month} className="month-item">
              <h4>{data.month}</h4>
              <div className="month-bars">
                <div className="bar-container">
                  <div 
                    className="bar income"
                    style={{ height: `${(data.income/10000) * 100}%` }}
                  ></div>
                  <span className="bar-label">Income</span>
                </div>
                <div className="bar-container">
                  <div 
                    className="bar expenses"
                    style={{ height: `${(data.expenses/10000) * 100}%` }}
                  ></div>
                  <span className="bar-label">Expenses</span>
                </div>
              </div>
              <div className="month-details">
                <p>Income: ${data.income}</p>
                <p>Expenses: ${data.expenses}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
