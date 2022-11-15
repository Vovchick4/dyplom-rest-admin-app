import { createElement } from 'react';

import styles from './Button.module.css';
import { Loader } from '../';

export default function Button({
  type = 'button',
  variant = 'default',
  fullWidth = false,
  icon,
  children,
  onClick,
  loading,
  as = 'button',
  ...props
}) {
  const classes = [styles[variant]];

  if (fullWidth) {
    classes.push(styles.fullWidth);
  }

  return createElement(
    as,
    {
      className: classes.join(' '),
      type: type,
      onClick: onClick,
      ...props,
    },
    loading ? (
      <Loader size={2} />
    ) : (
      <>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.content}>{children}</span>
      </>
    )
  );

  // <button
  //   className={classes.join(' ')}
  //   type={type}
  //   onClick={onClick}
  //   {...props}
  // >
  //   {loading ? (
  //     <Loader size={2} />
  //   ) : (
  //     <>
  //       {icon && <span className={styles.icon}>{icon}</span>}
  //       <span className={styles.content}>{children}</span>
  //     </>
  //   )}
  // </button>
}
