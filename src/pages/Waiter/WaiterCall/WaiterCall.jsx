import { Loader } from '../../../components';
import { BiTime } from 'react-icons/bi';
import styles from './WaiterCall.module.css';

export default function WaiterCall({ data, isLoading }) {
  return (
    <div className={styles.content}>
      <div className={styles.content_title}>
        Waiter Call
        {data?.waiter?.length === 0 && <span>Doesn't have Waiter Call</span>}
        {isLoading && <Loader size={3.4} />}
      </div>

      {!isLoading && data?.waiter?.length > 0 && (
        <div className={styles.content_card}>
          {data.waiter.map(({ id, table_number, created_at }) => (
            <div
              key={id}
              className={id % 2 === 1 ? styles.card : styles.card_grey_mode}
            >
              <div className={styles.info_table_date}>
                <p className={styles.text_table}>{table_number}</p>
                <p className={styles.date_table}>
                  {new Date(created_at).toLocaleDateString()}
                </p>
              </div>
              <div className={styles.info_table_time}>
                <BiTime fontSize="20" />
                <p className={styles.time_table}>
                  {new Date(created_at).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
