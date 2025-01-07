'use client'
import { useState, useEffect } from 'react';
import styles from './notifications.module.css';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("/api/notification-events");

    eventSource.onmessage = (event) => {
      console.log('receieved in notifications', event);
      // console.log('receieved:', event.data);
      console.log('parsedreceieved:', JSON.parse(event.data));
      const notfs = JSON.parse(event.data);
      console.log(typeof notfs);
      const newNotifications = JSON.parse(event.data);
      setNotifications([...notifications, ...newNotifications]);
      console.log('notifications', notifications);
    };

    eventSource.onerror = () => {
      console.error("SSE error");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className={styles.notificationsContainer}>
      <h1 className={styles.title}>Notifications</h1>

      <div className={styles.notificationsList}>
        {notifications.map((notification, index) => (
          <div key={index} className={styles.notificationCard}>
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
