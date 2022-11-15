import styles from './PageHeader.module.css';

export default function PageHeader({ title, Button }) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <div className={styles.button}>{Button}</div>
    </div>
  );
}
