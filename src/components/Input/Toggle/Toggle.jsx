import { useMemo } from 'react';
import { v4 } from 'uuid';

import styles from './Toggle.module.css';

export default function Toggle({ ...inputProps }) {
  const id = useMemo(() => v4(), []);

  return (
    <label htmlFor={id} className={styles.toggle}>
      <input
        type="checkbox"
        id={id}
        {...inputProps}
        className={`${styles.input} visually-hidden`}
      />
      <span className={styles.handle} />
    </label>
  );
}
