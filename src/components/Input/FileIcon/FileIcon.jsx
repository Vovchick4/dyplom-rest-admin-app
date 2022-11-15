import { useMemo } from 'react';
import { v4 } from 'uuid';

import styles from './FileIcon.module.css';

export default function FileIcon({
  icon: Icon,
  accept,
  value,
  onChange,
  ...inputProps
}) {
  const id = useMemo(() => v4(), []);

  return (
    <div className={styles.imgInputBox}>
      <label htmlFor={id} className={styles.label}>
        <Icon className={styles.icon} />
      </label>
      <input
        id={id}
        className={`visually-hidden ${styles.input}`}
        type="file"
        accept={accept}
        onChange={onChange}
        {...inputProps}
      />
    </div>
  );
}
