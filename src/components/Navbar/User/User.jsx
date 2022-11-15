import { FaUserCircle } from 'react-icons/fa';

import styles from './User.module.css';

export default function User() {
  return (
    <div>
      <button className={styles.user}>
        <FaUserCircle />
      </button>
    </div>
  );
}
