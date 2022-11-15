import styles from './ToggleText.module.css';

export default function Toggle({ id, ...inputProps }) {
  return (
    <label htmlFor={id} className={styles.toggle}>
      <input
        type="checkbox"
        id={id}
        className={`${styles.input} visually-hidden`}
        {...inputProps}
      />
      <div className={styles.handle}></div>
    </label>
  );
}
