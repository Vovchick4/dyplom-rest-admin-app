import { AiOutlineClose } from 'react-icons/ai';

import styles from './Header.module.css';

export default function Header({ title, onCancel }) {
  return (
    <div className={styles.header}>
      <h3 className={styles.title}>{title}</h3>
      <button className={styles.closeBtn} onClick={onCancel}>
        <AiOutlineClose className={styles.closeIcon} />
      </button>
    </div>
  );
}
