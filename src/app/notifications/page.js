'use client'
import { useState } from 'react';
import styles from './notifications.module.css';

export default function Notifications() {
  const [notifications] = useState([
    {
      id: 1,
      message: 'Notification One: fastfastfastfastfast',
      date: 'Date'
    },
    {
      id: 2,
      message: 'Notification Two: fastfastfastfastfast',
      date: 'Date'
    },
    {
      id: 3,
      message: 'Notification Three: fastfastfastfastfast',
      date: 'Date'
    }
  ]);

  return (
    <div className={styles.notificationsContainer}>
      <h1 className={styles.title}>Notifications</h1>
      
      <div className={styles.notificationsList}>
        {notifications.map((notification) => (
          <div key={notification.id} className={styles.notificationCard}>
            <div className={styles.notificationContent}>
              <p className={styles.message}>{notification.message}</p>
              <span className={styles.date}>{notification.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
