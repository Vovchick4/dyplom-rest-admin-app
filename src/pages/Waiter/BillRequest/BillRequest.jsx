import { useState, useEffect } from 'react';
import { Loader } from '../../../components';
import { BiTime } from 'react-icons/bi';
import styles from './BillRequest.module.css';

export default function BillRequest({ opsCategory, data, loading }) {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(
      data.length > 0
        ? data.filter(({ category }) => category === opsCategory)
        : []
    );

    return () => setFilteredData([]);
  }, [opsCategory, data]);

  return (
    <div className={styles.content}>
      <div className={styles.content_title}>
        Bill Request {loading && <Loader size={3.4} />}
      </div>

      <div className={styles.content_card}>
        {!loading && filteredData.length > 0 && (
          <div className={styles.content_card}>
            {filteredData.map(({ id, table_number, created_at }) => (
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
    </div>
  );
}
