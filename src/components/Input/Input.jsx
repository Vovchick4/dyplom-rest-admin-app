import { CSSTransition } from 'react-transition-group';

import fadeIn from '../../styles/animations/fadeIn.module.css';
import styles from './Input.module.css';
import File from './File';
import FileIcon from './FileIcon';
import Toggle from './Toggle';
import ToggleText from './ToggleText';
import Select from './Select';

export default function Input({
  type,
  placeholder,
  value,
  onChange,
  error,
  ...inputProps
}) {
  return (
    <div className={styles.container}>
      <input
        className={error ? styles.inputError : styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...inputProps}
      />

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

Input.File = File;
Input.FileIcon = FileIcon;
Input.Toggle = Toggle;
Input.ToggleText = ToggleText;
Input.Select = Select;
