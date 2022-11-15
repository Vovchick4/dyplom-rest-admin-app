import styles from './Loader.module.css';

export default function Loader({ size = 4, centered = false }) {
  return (
    <div
      className={centered ? styles.centered : styles.loader}
      style={{
        fontSize: `${size}px`
      }}
    />
  );
}
