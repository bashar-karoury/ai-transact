'use client'
import { useState } from 'react';
import { 
  BellIcon, 
  CurrencyDollarIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'transaction',
      title: 'New Transaction',
      message: 'You received $500 from John Doe',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'alert',
      title: 'Budget Alert',
      message: 'You have exceeded your shopping budget',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'success',
      title: 'Payment Successful',
      message: 'Your payment of $100 was successful',
      time: '2 hours ago',
      read: true
    }
  ]);

  const getIcon = (type) => {
    switch(type) {
      case 'transaction':
        return <CurrencyDollarIcon className="notification-icon transaction" />;
      case 'alert':
        return <ExclamationCircleIcon className="notification-icon alert" />;
      case 'success':
        return <CheckCircleIcon className="notification-icon success" />;
      default:
        return <BellIcon className="notification-icon" />;
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? {...notif, read: true} : notif
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h1>Notifications</h1>
        <div className="notifications-actions">
          <button className="action-button">
            Mark all as read
          </button>
          <button className="action-button">
            Clear all
          </button>
        </div>
      </div>

      <div className="notifications-list">
        {notifications.map(notification => (
          <div 
            key={notification.id} 
            className={`notification-item ${notification.read ? 'read' : 'unread'}`}
          >
            <div className="notification-content">
              {getIcon(notification.type)}
              <div className="notification-text">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
                <div className="notification-time">
                  <ClockIcon className="time-icon" />
                  <span>{notification.time}</span>
                </div>
              </div>
            </div>
            <div className="notification-actions">
              {!notification.read && (
                <button 
                  className="read-button"
                  onClick={() => markAsRead(notification.id)}
                >
                  Mark as read
                </button>
              )}
              <button 
                className="delete-button"
                onClick={() => deleteNotification(notification.id)}
              >
                <XMarkIcon className="delete-icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
