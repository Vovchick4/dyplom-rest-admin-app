import { FiDownload } from 'react-icons/fi';

import styles from './InvoiceCard.module.css';

export default function InvoiceCard({ id, date, time, invoice }) {
  return (
    <div className={id % 2 === 1 ? styles.card : styles.card_grey_mode}>
      <p className={styles.date}>
        {new Date(date).toLocaleDateString()}
        <span className={styles.time}>{time}</span>
      </p>
      <p className={styles.invoice_number}>{invoice}</p>
      <button type="button" className={styles.download}>
        <FiDownload />
      </button>
    </div>
  );
}
