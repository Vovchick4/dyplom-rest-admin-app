import { IoIosNotifications } from 'react-icons/io';

import styles from './Notifications.module.css';

export default function Notifications({ count }) {
  return (
    <div>
      <button className={styles.notification}>
        <IoIosNotifications />
        <div className={styles.circle}>
          <p>{count}</p>
        </div>
      </button>
    </div>
  );
}
