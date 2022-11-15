import { useMemo } from 'react';
import { BsUpload } from 'react-icons/bs';
import { v4 } from 'uuid';
import { CSSTransition } from 'react-transition-group';

import styles from './File.module.css';
import fadeIn from '../../../styles/animations/fadeIn.module.css';

export default function File({
  accept,
  placeholder,
  value,
  onChange,
  error,
  ...inputProps
}) {
  const id = useMemo(() => v4(), []);

  return (
    <div className={styles.container}>
      <div className={styles.inputField}>
        <input
          className={`visually-hidden ${styles.inputElem}`}
          type="file"
          accept={accept}
          id={id}
          placeholder={value ? value.name : placeholder}
          onChange={onChange}
          {...inputProps}
        />
        <label
          htmlFor={id}
          className={error ? styles.labelError : styles.label}
        >
          <span className={value ? styles.value : styles.placeholder}>
            {value ? value.name : placeholder}
          </span>
          <BsUpload className={styles.icon} />
        </label>
      </div>

      <CSSTransition
        in={!!error}
        unmountOnExit
        classNames={fadeIn}
        timeout={75}
      >
        <span className={styles.error}>{error}</span>
      </CSSTransition>
    </div>
  );
}
