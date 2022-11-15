import { CSSTransition } from 'react-transition-group';

import styles from './Modal.module.css';
import fadeIn from '../../styles/animations/fadeIn.module.css';
import Header from './Header';

export default function Modal({ visible, children, className, onClose }) {
  function handleDimmerClick(e) {
    if (e.target !== e.currentTarget) {
      return;
    }

    onClose();
  }

  return (
    <CSSTransition in={visible} unmountOnExit classNames={fadeIn} timeout={75}>
      <div className={styles.dimmer} onMouseDown={handleDimmerClick}>
        <div className={`${styles.modal} ${className}`}>{children}</div>
      </div>
    </CSSTransition>
  );
}

Modal.Header = Header;
