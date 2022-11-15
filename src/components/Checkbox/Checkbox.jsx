import { useMemo } from 'react';
import { v4 } from 'uuid';
import { BiCheck } from 'react-icons/bi';

import styles from './Checkbox.module.css';

export default function Checkbox({ label, checked, onChange, ...inputProps }) {
  const id = useMemo(() => v4(), []);

  return (
    <div className={styles.container}>
      <label
        htmlFor={id}
        className={checked ? styles.labelChecked : styles.label}
      >
        <div className={styles.checkbox}>
          {checked && <BiCheck className={styles.checkboxIcon} />}
        </div>
        {label && <span className={styles.labelText}>{label}</span>}
      </label>

      <input
        className={styles.input}
        id={id}
        type="checkbox"
        value={checked}
        onChange={onChange}
        {...inputProps}
      />
    </div>
  );
}
