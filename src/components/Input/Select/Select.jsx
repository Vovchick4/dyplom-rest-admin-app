import { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './Select.module.css';
import fadeIn from '../../../styles/animations/fadeIn.module.css';

// import checkIcon from '../../../images/icons/ic-check.svg';
import arrowIcon from '../../../images/icons/arrow-back.svg';

export default function Select({ options, value, onChange }) {
  const [dropdown, setDropdown] = useState(false);
  const containerDropdown = useRef();

  const handleClickOutside = (e) => {
    if (
      containerDropdown.current &&
      !containerDropdown.current.contains(e.target)
    ) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const activeOption = options.find((option) => option.value === value);

  return (
    <div
      className={styles.selectContent}
      ref={containerDropdown}
      onClick={() => setDropdown(!dropdown)}
    >
      <div className={styles.select}>
        <span>{activeOption.label}</span>
        {!dropdown ? (
          <img
            className={styles.iconLeft}
            src={arrowIcon}
            width="9"
            height="18"
            alt="arrowIcon"
          />
        ) : (
          <img
            className={styles.iconRight}
            src={arrowIcon}
            width="9"
            height="18"
            alt="arrowIcon"
          />
        )}
      </div>

      <CSSTransition
        classNames={fadeIn}
        in={dropdown}
        unmountOnExit
        timeout={200}
      >
        <ul className={styles.selectItems}>
          {options.map((item) => (
            <li
              className={styles.selectItem}
              key={item.label}
              onClick={() => onChange(item.value)}
              value={item.value}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </CSSTransition>
    </div>
  );
}
