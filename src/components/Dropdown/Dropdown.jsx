import { CSSTransition } from 'react-transition-group';

import styles from './Dropdown.module.css';
import fadeIn from '../../styles/animations/fadeIn.module.css';

export default function Dropdown({ open, align = 'right', options, onClose }) {
  return (
    <CSSTransition in={open} unmountOnExit timeout={75} classNames={fadeIn}>
      <div>
        <div className={styles.dimmer} onClick={onClose} />
        <div className={styles[align]} onClick={onClose}>
          {options.map((option) => (
            <button
              key={option.key}
              type="button"
              className={`${styles.dropdownBtn} ${option.className}`}
              {...option}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </CSSTransition>
  );
}
