import { FiDownload } from 'react-icons/fi';

import styles from './InvoiceCard.module.css';

export default function InvoiceCard({
  id,
  code,
  created_at,
  plates,
  downloadTxtFile,
  ...rest
}) {
  return (
    <div className={id % 2 === 1 ? styles.card : styles.card_grey_mode}>
      <p className={styles.date}>
        {new Date(created_at).toLocaleDateString()}
        <span className={styles.time}>
          {new Date(created_at).toLocaleTimeString()}
        </span>
      </p>
      <p className={styles.invoice_number}>
        {'invoice'} {code}
      </p>
      <button
        type="button"
        className={styles.download}
        onClick={() =>
          downloadTxtFile({ id, code, created_at, ...rest }, plates)
        }
      >
        <FiDownload />
      </button>
    </div>
  );
}
