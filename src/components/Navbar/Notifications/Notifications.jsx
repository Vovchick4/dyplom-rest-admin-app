import { IoIosNotifications } from 'react-icons/io';

import styles from './Notifications.module.css';

export default function Notifications({ count }) {
  return (
    <div className={styles.notification}>
      <IoIosNotifications />
      <div className={styles.circle}>
        <p>{count}</p>
      </div>
    </div>
  );
}
