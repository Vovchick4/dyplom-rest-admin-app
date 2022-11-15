import { FiSettings } from 'react-icons/fi';

import styles from './Settings.module.css';

export default function Settings() {
  return (
    <div>
      <button className={styles.settings}>
        <FiSettings />
      </button>
    </div>
  );
}
