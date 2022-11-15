import styles from './WaiterCall.module.css';

import { BiTime } from 'react-icons/bi';

import waiter from '../data';

export default function WaiterCall() {
  return (
    <div className={styles.content}>
      <div className={styles.content_title}>Waiter Call</div>

      <div className={styles.content_card}>
        {waiter.map((item) => (
          <div
            key={item.id}
            className={item.id % 2 === 1 ? styles.card : styles.card_grey_mode}
          >
            <div className={styles.info_table_date}>
              <p className={styles.text_table}>{item.table}</p>
              <p className={styles.date_table}>
                {item.date.toLocaleDateString()}
              </p>
            </div>
            <div className={styles.info_table_time}>
              <BiTime fontSize="20" />
              <p className={styles.time_table}>{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
