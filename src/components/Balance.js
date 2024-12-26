'use client'
import { useState } from 'react';
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  CurrencyDollarIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

export default function Balance() {
  const [balance, setBalance] = useState({
    total: 120948,
    currency: 'USD',
    lastUpdate: new Date(),
    recentTransactions: [
      { id: 1, type: 'income', amount: 5000, description: 'Salary', date: '2024-03-15' },
      { id: 2, type: 'expense', amount: 1500, description: 'Rent', date: '2024-03-10' },
      { id: 3, type: 'income', amount: 1000, description: 'Freelance', date: '2024-03-08' }
    ]
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: balance.currency
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const refreshBalance = () => {
    // Here you would typically fetch the latest balance from your API
    setBalance(prev => ({
      ...prev,
      lastUpdate: new Date()
    }));
  };

  return (
    <div className="balance-widget">
      <div className="balance-header">
        <div className="balance-title">
          <CurrencyDollarIcon className="currency-icon" />
          <h2>Current Balance</h2>
        </div>
        <button className="refresh-button" onClick={refreshBalance}>
          <ArrowPathIcon className="refresh-icon" />
          Refresh
        </button>
      </div>

      <div className="balance-amount">
        <h1>{formatCurrency(balance.total)}</h1>
        <p className="last-update">
          Last updated: {balance.lastUpdate.toLocaleTimeString()}
        </p>
      </div>

      <div className="recent-transactions">
        <h3>Recent Transactions</h3>
        <div className="transactions-list">
          {balance.recentTransactions.map(transaction => (
            <div key={transaction.id} className="transaction-item">
              <div className="transaction-icon">
                {transaction.type === 'income' ? (
                  <ArrowUpIcon className="icon income" />
                ) : (
                  <ArrowDownIcon className="icon expense" />
                )}
              </div>
              <div className="transaction-details">
                <h4>{transaction.description}</h4>
                <p className="transaction-date">{formatDate(transaction.date)}</p>
              </div>
              <div className={`transaction-amount ${transaction.type}`}>
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="balance-footer">
        <div className="balance-stat">
          <p>Income</p>
          <h4 className="income">+{formatCurrency(6000)}</h4>
        </div>
        <div className="balance-stat">
          <p>Expenses</p>
          <h4 className="expense">-{formatCurrency(1500)}</h4>
        </div>
      </div>
    </div>
  );
} 